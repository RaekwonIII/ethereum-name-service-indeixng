import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './multicall-uniswap.abi'

export const abi = new ethers.utils.Interface(ABI_JSON);

export const functions = {
    aggregate: new Func<[calls: Array<([target: string, callData: string] & {target: string, callData: string})>], {calls: Array<([target: string, callData: string] & {target: string, callData: string})>}, ([blockNumber: ethers.BigNumber, returnData: Array<string>] & {blockNumber: ethers.BigNumber, returnData: Array<string>})>(
        abi, '0x252dba42'
    ),
    blockAndAggregate: new Func<[calls: Array<([target: string, callData: string] & {target: string, callData: string})>], {calls: Array<([target: string, callData: string] & {target: string, callData: string})>}, ([blockNumber: ethers.BigNumber, blockHash: string, returnData: Array<([success: boolean, returnData: string] & {success: boolean, returnData: string})>] & {blockNumber: ethers.BigNumber, blockHash: string, returnData: Array<([success: boolean, returnData: string] & {success: boolean, returnData: string})>})>(
        abi, '0xc3077fa9'
    ),
    getBlockHash: new Func<[blockNumber: ethers.BigNumber], {blockNumber: ethers.BigNumber}, string>(
        abi, '0xee82ac5e'
    ),
    getBlockNumber: new Func<[], {}, ethers.BigNumber>(
        abi, '0x42cbb15c'
    ),
    getCurrentBlockCoinbase: new Func<[], {}, string>(
        abi, '0xa8b0574e'
    ),
    getCurrentBlockDifficulty: new Func<[], {}, ethers.BigNumber>(
        abi, '0x72425d9d'
    ),
    getCurrentBlockGasLimit: new Func<[], {}, ethers.BigNumber>(
        abi, '0x86d516e8'
    ),
    getCurrentBlockTimestamp: new Func<[], {}, ethers.BigNumber>(
        abi, '0x0f28c97d'
    ),
    getEthBalance: new Func<[addr: string], {addr: string}, ethers.BigNumber>(
        abi, '0x4d2301cc'
    ),
    getLastBlockHash: new Func<[], {}, string>(
        abi, '0x27e86d6e'
    ),
    tryAggregate: new Func<[requireSuccess: boolean, calls: Array<([target: string, callData: string] & {target: string, callData: string})>], {requireSuccess: boolean, calls: Array<([target: string, callData: string] & {target: string, callData: string})>}, Array<([success: boolean, returnData: string] & {success: boolean, returnData: string})>>(
        abi, '0xbce38bd7'
    ),
    tryBlockAndAggregate: new Func<[requireSuccess: boolean, calls: Array<([target: string, callData: string] & {target: string, callData: string})>], {requireSuccess: boolean, calls: Array<([target: string, callData: string] & {target: string, callData: string})>}, ([blockNumber: ethers.BigNumber, blockHash: string, returnData: Array<([success: boolean, returnData: string] & {success: boolean, returnData: string})>] & {blockNumber: ethers.BigNumber, blockHash: string, returnData: Array<([success: boolean, returnData: string] & {success: boolean, returnData: string})>})>(
        abi, '0x399542e9'
    ),
}

export class Contract extends ContractBase {

    getBlockHash(blockNumber: ethers.BigNumber): Promise<string> {
        return this.eth_call(functions.getBlockHash, [blockNumber])
    }

    getBlockNumber(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.getBlockNumber, [])
    }

    getCurrentBlockCoinbase(): Promise<string> {
        return this.eth_call(functions.getCurrentBlockCoinbase, [])
    }

    getCurrentBlockDifficulty(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.getCurrentBlockDifficulty, [])
    }

    getCurrentBlockGasLimit(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.getCurrentBlockGasLimit, [])
    }

    getCurrentBlockTimestamp(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.getCurrentBlockTimestamp, [])
    }

    getEthBalance(addr: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.getEthBalance, [addr])
    }

    getLastBlockHash(): Promise<string> {
        return this.eth_call(functions.getLastBlockHash, [])
    }
}
