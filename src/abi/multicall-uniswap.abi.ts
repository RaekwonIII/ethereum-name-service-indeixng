export const ABI_JSON = [
    {
        "type": "function",
        "name": "aggregate",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple[]",
                "name": "calls",
                "components": [
                    {
                        "type": "address",
                        "name": "target"
                    },
                    {
                        "type": "bytes",
                        "name": "callData"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "blockNumber"
            },
            {
                "type": "bytes[]",
                "name": "returnData"
            }
        ]
    },
    {
        "type": "function",
        "name": "blockAndAggregate",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple[]",
                "name": "calls",
                "components": [
                    {
                        "type": "address",
                        "name": "target"
                    },
                    {
                        "type": "bytes",
                        "name": "callData"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "blockNumber"
            },
            {
                "type": "bytes32",
                "name": "blockHash"
            },
            {
                "type": "tuple[]",
                "name": "returnData",
                "components": [
                    {
                        "type": "bool",
                        "name": "success"
                    },
                    {
                        "type": "bytes",
                        "name": "returnData"
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "getBlockHash",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "blockNumber"
            }
        ],
        "outputs": [
            {
                "type": "bytes32",
                "name": "blockHash"
            }
        ]
    },
    {
        "type": "function",
        "name": "getBlockNumber",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": "blockNumber"
            }
        ]
    },
    {
        "type": "function",
        "name": "getCurrentBlockCoinbase",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": "coinbase"
            }
        ]
    },
    {
        "type": "function",
        "name": "getCurrentBlockDifficulty",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": "difficulty"
            }
        ]
    },
    {
        "type": "function",
        "name": "getCurrentBlockGasLimit",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": "gaslimit"
            }
        ]
    },
    {
        "type": "function",
        "name": "getCurrentBlockTimestamp",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": "timestamp"
            }
        ]
    },
    {
        "type": "function",
        "name": "getEthBalance",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "addr"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "balance"
            }
        ]
    },
    {
        "type": "function",
        "name": "getLastBlockHash",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bytes32",
                "name": "blockHash"
            }
        ]
    },
    {
        "type": "function",
        "name": "tryAggregate",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bool",
                "name": "requireSuccess"
            },
            {
                "type": "tuple[]",
                "name": "calls",
                "components": [
                    {
                        "type": "address",
                        "name": "target"
                    },
                    {
                        "type": "bytes",
                        "name": "callData"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "type": "tuple[]",
                "name": "returnData",
                "components": [
                    {
                        "type": "bool",
                        "name": "success"
                    },
                    {
                        "type": "bytes",
                        "name": "returnData"
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "tryBlockAndAggregate",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bool",
                "name": "requireSuccess"
            },
            {
                "type": "tuple[]",
                "name": "calls",
                "components": [
                    {
                        "type": "address",
                        "name": "target"
                    },
                    {
                        "type": "bytes",
                        "name": "callData"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "blockNumber"
            },
            {
                "type": "bytes32",
                "name": "blockHash"
            },
            {
                "type": "tuple[]",
                "name": "returnData",
                "components": [
                    {
                        "type": "bool",
                        "name": "success"
                    },
                    {
                        "type": "bytes",
                        "name": "returnData"
                    }
                ]
            }
        ]
    }
]
