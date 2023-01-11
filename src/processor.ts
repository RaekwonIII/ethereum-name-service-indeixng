import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import {BlockHandlerContext, EvmBatchProcessor, LogHandlerContext} from '@subsquid/evm-processor'
import { events, Contract as ContractAPI, functions } from "./abi/bayc";
import { Multicall } from "./abi/multicall";
import { Contract, Owner, Token, Transfer } from "./model";
import { In } from "typeorm";
import { BigNumber } from "ethers";
import { maxBy } from "lodash";

const contractAddress =
  // "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85".toLowerCase();
  // BAYC
  "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D".toLowerCase();

const multicallAddress = "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696".toLowerCase();

const processor = new EvmBatchProcessor()
.setDataSource({
  chain: process.env.RPC_ENDPOINT,
  archive: "https://eth.archive.subsquid.io",
})
.addLog(contractAddress, {
  filter: [
    [
      events.Transfer.topic,
    ],
  ],
  data: {
    evmLog: {
      topics: true,
      data: true,
    },
    transaction: {
      hash: true,
    },
  },
});


processor.run(new TypeormDatabase(), async (ctx) => {
  const ensDataArr: ENSData[] = [];
  
  for (let c of ctx.blocks) {
    for (let i of c.items) {
      if (i.address === contractAddress && i.kind === "evmLog") {
        if (i.evmLog.topics[0] === events.Transfer.topic) {
          const ensData = handleTransfer({
            ...ctx,
            block: c.header,
            ...i,
          });
          ensDataArr.push(ensData);
        }
      }
    }
  }

  await saveENSData(
    {
      ...ctx,
      block: ctx.blocks[ctx.blocks.length - 1].header,
    },
    ensDataArr
  );
});

let contractEntity: Contract | undefined;

export async function getOrCreateContractEntity(
  ctx: BlockHandlerContext<Store>
): Promise<Contract> {
  if (contractEntity == null) {
    contractEntity = await ctx.store.get(Contract, contractAddress);
    if (contractEntity == null) {
      const contractAPI = new ContractAPI(ctx, contractAddress);
      let name = "", symbol = "", totalSupply = BigNumber.from(0);
      try {
        name = await contractAPI.name();
        symbol = await contractAPI.symbol();
        totalSupply = await contractAPI.totalSupply();
      } catch (error) {
        ctx.log.warn(`[API] Error while fetching Contract metadata for address ${contractAddress}`);
        if (error instanceof Error) {
          ctx.log.warn(`${error.message}`);
        }
      }
      contractEntity = new Contract({
        id: contractAddress,
        name: name,
        symbol: symbol,
        totalSupply: totalSupply.toBigInt(),
      });
      await ctx.store.insert(contractEntity);
    }
  }
  return contractEntity;
}

type ENSData = {
  id: string;
  from: string;
  to: string;
  tokenId: bigint;
  timestamp: bigint;
  block: number;
  transactionHash: string;
};


function handleTransfer(
  ctx: LogHandlerContext<
    Store,
    { evmLog: { topics: true; data: true }; transaction: { hash: true } }
  >
): ENSData {
  const { evmLog, block, transaction } = ctx;

  const { from, to, tokenId } = events.Transfer.decode(evmLog);

  const ensData: ENSData = {
    id: `${transaction.hash}-${evmLog.address}-${tokenId.toBigInt()}-${
      evmLog.index
    }`,
    from,
    to,
    tokenId: tokenId.toBigInt(),
    timestamp: BigInt(block.timestamp),
    block: block.height,
    transactionHash: transaction.hash,
  };
  return ensData;
}

async function saveENSData(
  ctx: BlockHandlerContext<Store>,
  ensDataArr: ENSData[]
) {
  const tokensIds: Set<string> = new Set();
  const ownersIds: Set<string> = new Set();

  for (const ensData of ensDataArr) {
    tokensIds.add(ensData.tokenId.toString());
    if (ensData.from) ownersIds.add(ensData.from.toLowerCase());
    if (ensData.to) ownersIds.add(ensData.to.toLowerCase());
  }

  const transfers: Set<Transfer> = new Set();

  const tokens: Map<string, Token> = new Map(
    (await ctx.store.findBy(Token, { id: In([...tokensIds]) })).map((token) => [
      token.id,
      token,
    ])
  );

  const owners: Map<string, Owner> = new Map(
    (await ctx.store.findBy(Owner, { id: In([...ownersIds]) })).map((owner) => [
      owner.id,
      owner,
    ])
  );

  for (const ensData of ensDataArr) {
    const {
      id,
      tokenId,
      from,
      to,
      block,
      transactionHash,
      timestamp,
    } = ensData;

    let fromOwner = owners.get(from);
    if (fromOwner == null) {
      fromOwner = new Owner({ id: from.toLowerCase() });
      owners.set(fromOwner.id, fromOwner);
    }

    let toOwner = owners.get(to);
    if (toOwner == null) {
      toOwner = new Owner({ id: to.toLowerCase() });
      owners.set(toOwner.id, toOwner);
    }

    const tokenIdString = tokenId.toString();
    let token = tokens.get(tokenIdString);
    if (token == null) {
      token = new Token({
        id: tokenIdString,
        contract: await getOrCreateContractEntity(ctx),
      });
      tokens.set(token.id, token);
    }
    token.owner = toOwner;

    if (toOwner && fromOwner) {
      const transfer = new Transfer({
        id,
        block,
        timestamp,
        transactionHash,
        from: fromOwner,
        to: toOwner,
        token,
      });

      transfers.add(transfer);
    }
  }

  const maxHeight = maxBy(ensDataArr, d => d.block)!.block;
  const multicallAPI = new Multicall(ctx, {height: maxHeight}, multicallAddress);

  ctx.log.info(`Calling multicall for ${ ensDataArr.length} tokens...`);

  const results = await multicallAPI.tryAggregate(functions.tokenURI, ensDataArr.map(d => [contractAddress, [BigNumber.from(d.tokenId)]] as [string, BigNumber[]]), 100);

  results.forEach((res, i) => {
    let t = tokens.get(ensDataArr[i].tokenId.toString());
    if(t) {
      let uri = '';
      if (res.success) {
        uri = <string>res.value;
      } else if (res.returnData) {
        uri = <string>functions.tokenURI.tryDecodeResult(res.returnData) || '';
      }
    }
  });
  ctx.log.info("Done");

  await ctx.store.save([...owners.values()]);
  await ctx.store.save([...tokens.values()]);
  await ctx.store.save([...transfers]);
}

