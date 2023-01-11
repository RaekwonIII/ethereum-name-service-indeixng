import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './bayc.abi'

export const abi = new ethers.utils.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, approved: string, tokenId: ethers.BigNumber] & {owner: string, approved: string, tokenId: ethers.BigNumber})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    ApprovalForAll: new LogEvent<([owner: string, operator: string, approved: boolean] & {owner: string, operator: string, approved: boolean})>(
        abi, '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    Transfer: new LogEvent<([from: string, to: string, tokenId: ethers.BigNumber] & {from: string, to: string, tokenId: ethers.BigNumber})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
}

export const functions = {
    BAYC_PROVENANCE: new Func<[], {}, string>(
        abi, '0x607e20e3'
    ),
    MAX_APES: new Func<[], {}, ethers.BigNumber>(
        abi, '0xbb8a16bd'
    ),
    REVEAL_TIMESTAMP: new Func<[], {}, ethers.BigNumber>(
        abi, '0x18e20a38'
    ),
    apePrice: new Func<[], {}, ethers.BigNumber>(
        abi, '0x7a3f451e'
    ),
    approve: new Func<[to: string, tokenId: ethers.BigNumber], {to: string, tokenId: ethers.BigNumber}, []>(
        abi, '0x095ea7b3'
    ),
    balanceOf: new Func<[owner: string], {owner: string}, ethers.BigNumber>(
        abi, '0x70a08231'
    ),
    baseURI: new Func<[], {}, string>(
        abi, '0x6c0360eb'
    ),
    emergencySetStartingIndexBlock: new Func<[], {}, []>(
        abi, '0x7d17fcbe'
    ),
    flipSaleState: new Func<[], {}, []>(
        abi, '0x34918dfd'
    ),
    getApproved: new Func<[tokenId: ethers.BigNumber], {tokenId: ethers.BigNumber}, string>(
        abi, '0x081812fc'
    ),
    isApprovedForAll: new Func<[owner: string, operator: string], {owner: string, operator: string}, boolean>(
        abi, '0xe985e9c5'
    ),
    maxApePurchase: new Func<[], {}, ethers.BigNumber>(
        abi, '0x571dff3b'
    ),
    mintApe: new Func<[numberOfTokens: ethers.BigNumber], {numberOfTokens: ethers.BigNumber}, []>(
        abi, '0xa723533e'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    ownerOf: new Func<[tokenId: ethers.BigNumber], {tokenId: ethers.BigNumber}, string>(
        abi, '0x6352211e'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    reserveApes: new Func<[], {}, []>(
        abi, '0xb0f67427'
    ),
    'safeTransferFrom(address,address,uint256)': new Func<[from: string, to: string, tokenId: ethers.BigNumber], {from: string, to: string, tokenId: ethers.BigNumber}, []>(
        abi, '0x42842e0e'
    ),
    'safeTransferFrom(address,address,uint256,bytes)': new Func<[from: string, to: string, tokenId: ethers.BigNumber, _data: string], {from: string, to: string, tokenId: ethers.BigNumber, _data: string}, []>(
        abi, '0xb88d4fde'
    ),
    saleIsActive: new Func<[], {}, boolean>(
        abi, '0xeb8d2444'
    ),
    setApprovalForAll: new Func<[operator: string, approved: boolean], {operator: string, approved: boolean}, []>(
        abi, '0xa22cb465'
    ),
    setBaseURI: new Func<[baseURI: string], {baseURI: string}, []>(
        abi, '0x55f804b3'
    ),
    setProvenanceHash: new Func<[provenanceHash: string], {provenanceHash: string}, []>(
        abi, '0x10969523'
    ),
    setRevealTimestamp: new Func<[revealTimeStamp: ethers.BigNumber], {revealTimeStamp: ethers.BigNumber}, []>(
        abi, '0x018a2c37'
    ),
    setStartingIndex: new Func<[], {}, []>(
        abi, '0xe9866550'
    ),
    startingIndex: new Func<[], {}, ethers.BigNumber>(
        abi, '0xcb774d47'
    ),
    startingIndexBlock: new Func<[], {}, ethers.BigNumber>(
        abi, '0xe36d6498'
    ),
    supportsInterface: new Func<[interfaceId: string], {interfaceId: string}, boolean>(
        abi, '0x01ffc9a7'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    tokenByIndex: new Func<[index: ethers.BigNumber], {index: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0x4f6ccce7'
    ),
    tokenOfOwnerByIndex: new Func<[owner: string, index: ethers.BigNumber], {owner: string, index: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0x2f745c59'
    ),
    tokenURI: new Func<[tokenId: ethers.BigNumber], {tokenId: ethers.BigNumber}, string>(
        abi, '0xc87b56dd'
    ),
    totalSupply: new Func<[], {}, ethers.BigNumber>(
        abi, '0x18160ddd'
    ),
    transferFrom: new Func<[from: string, to: string, tokenId: ethers.BigNumber], {from: string, to: string, tokenId: ethers.BigNumber}, []>(
        abi, '0x23b872dd'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    withdraw: new Func<[], {}, []>(
        abi, '0x3ccfd60b'
    ),
}

export class Contract extends ContractBase {

    BAYC_PROVENANCE(): Promise<string> {
        return this.eth_call(functions.BAYC_PROVENANCE, [])
    }

    MAX_APES(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.MAX_APES, [])
    }

    REVEAL_TIMESTAMP(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.REVEAL_TIMESTAMP, [])
    }

    apePrice(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.apePrice, [])
    }

    balanceOf(owner: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.balanceOf, [owner])
    }

    baseURI(): Promise<string> {
        return this.eth_call(functions.baseURI, [])
    }

    getApproved(tokenId: ethers.BigNumber): Promise<string> {
        return this.eth_call(functions.getApproved, [tokenId])
    }

    isApprovedForAll(owner: string, operator: string): Promise<boolean> {
        return this.eth_call(functions.isApprovedForAll, [owner, operator])
    }

    maxApePurchase(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.maxApePurchase, [])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    ownerOf(tokenId: ethers.BigNumber): Promise<string> {
        return this.eth_call(functions.ownerOf, [tokenId])
    }

    saleIsActive(): Promise<boolean> {
        return this.eth_call(functions.saleIsActive, [])
    }

    startingIndex(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.startingIndex, [])
    }

    startingIndexBlock(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.startingIndexBlock, [])
    }

    supportsInterface(interfaceId: string): Promise<boolean> {
        return this.eth_call(functions.supportsInterface, [interfaceId])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    tokenByIndex(index: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.tokenByIndex, [index])
    }

    tokenOfOwnerByIndex(owner: string, index: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.tokenOfOwnerByIndex, [owner, index])
    }

    tokenURI(tokenId: ethers.BigNumber): Promise<string> {
        return this.eth_call(functions.tokenURI, [tokenId])
    }

    totalSupply(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.totalSupply, [])
    }
}
