export type Architecture = {
  "version": "0.1.0",
  "name": "architecture",
  "instructions": [
    {
      "name": "createGame",
      "accounts": [
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameMaster",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "maxItemsPerPlayer",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createPlayer",
      "accounts": [
        {
          "name": "game",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "playerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "spawnMonster",
      "accounts": [
        {
          "name": "game",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "playerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "monster",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "attackMonster",
      "accounts": [
        {
          "name": "playerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "monster",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositActionPoints",
      "accounts": [
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "conceptSizes",
      "accounts": [
        {
          "name": "allTypes",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "string",
          "type": "string"
        },
        {
          "name": "vectorLength",
          "type": "u8"
        }
      ]
    },
    {
      "name": "conceptBox",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "someBigData",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "conceptZeroCopy",
      "accounts": [
        {
          "name": "someReallyBigData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "conceptDataOptimization",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gameFlagsBad",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gameFlagsGood",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "isFrozen",
          "type": "bool"
        }
      ]
    },
    {
      "name": "conceptForFutureUseV0",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gameState",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "health",
          "type": "u64"
        },
        {
          "name": "mana",
          "type": "u64"
        }
      ]
    },
    {
      "name": "conceptForFutureUseV1",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gameState",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "health",
          "type": "u64"
        },
        {
          "name": "mana",
          "type": "u64"
        },
        {
          "name": "experince",
          "type": "u64"
        }
      ]
    },
    {
      "name": "conceptDataOrder",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gameStateBad",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gameStateGood",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "maxItems",
          "type": "u8"
        }
      ]
    },
    {
      "name": "conceptIndexing",
      "accounts": [
        {
          "name": "single",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "onePerProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "onePerOwner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "multiplePerOwner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "onePerOwnerPerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "accountToPdaFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "multiplePerOwnerIndex",
          "type": "u64"
        }
      ]
    },
    {
      "name": "conceptSharedAccountBottleneck",
      "accounts": [
        {
          "name": "donationTally",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "communityWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lamportsToDonate",
          "type": "u64"
        }
      ]
    },
    {
      "name": "conceptSharedAccount",
      "accounts": [
        {
          "name": "donationTally",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lamportsToDonate",
          "type": "u64"
        }
      ]
    },
    {
      "name": "conceptSharedAccountRedeem",
      "accounts": [
        {
          "name": "donationTally",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "communityWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "someBigDataStruct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bigData",
            "type": {
              "array": [
                "u8",
                2000
              ]
            }
          }
        ]
      }
    },
    {
      "name": "badGameFlags",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isFrozen",
            "type": "bool"
          },
          {
            "name": "isPoisoned",
            "type": "bool"
          },
          {
            "name": "isBurning",
            "type": "bool"
          },
          {
            "name": "isBlessed",
            "type": "bool"
          },
          {
            "name": "isCursed",
            "type": "bool"
          },
          {
            "name": "isStunned",
            "type": "bool"
          },
          {
            "name": "isSlowed",
            "type": "bool"
          },
          {
            "name": "isBleeding",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "goodGameFlags",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "statusFlags",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "badGameState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "items",
            "type": {
              "vec": {
                "defined": "ExampleInventoryItem"
              }
            }
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "level",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "goodGameState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "level",
            "type": "u64"
          },
          {
            "name": "items",
            "type": {
              "vec": {
                "defined": "ExampleInventoryItem"
              }
            }
          }
        ]
      }
    },
    {
      "name": "gameState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "health",
            "type": "u64"
          },
          {
            "name": "mana",
            "type": "u64"
          },
          {
            "name": "forFutureUse",
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          }
        ]
      }
    },
    {
      "name": "someIndexingDataStruct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pdaType",
            "type": "u8"
          },
          {
            "name": "index",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "donationTally",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "lamportsDonated",
            "type": "u64"
          },
          {
            "name": "lamportsToRedeem",
            "type": "u64"
          },
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "dataTypes",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "byte",
            "type": "u8"
          },
          {
            "name": "twoBytes",
            "type": "u16"
          },
          {
            "name": "fourBytes",
            "type": "u32"
          },
          {
            "name": "eightBytes",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "sixteenBytes",
            "type": "u128"
          },
          {
            "name": "thirtyTwoBytes",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "publicKey",
            "type": "publicKey"
          },
          {
            "name": "someStruct",
            "type": {
              "defined": "SomeStruct"
            }
          },
          {
            "name": "someOption",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "fixedString",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          },
          {
            "name": "string",
            "type": "string"
          },
          {
            "name": "vec",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "someReallyBigDataStruct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reallyBigData",
            "type": {
              "array": [
                "u128",
                1024
              ]
            }
          }
        ]
      }
    },
    {
      "name": "game",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gameMaster",
            "type": "publicKey"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          },
          {
            "name": "actionPointsCollected",
            "type": "u64"
          },
          {
            "name": "gameConfig",
            "type": {
              "defined": "GameConfig"
            }
          },
          {
            "name": "forFutureUse",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          }
        ]
      }
    },
    {
      "name": "player",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "player",
            "type": "publicKey"
          },
          {
            "name": "game",
            "type": "publicKey"
          },
          {
            "name": "actionPointsSpent",
            "type": "u64"
          },
          {
            "name": "actionPointsToBeCollected",
            "type": "u64"
          },
          {
            "name": "statusFlag",
            "type": "u8"
          },
          {
            "name": "experince",
            "type": "u64"
          },
          {
            "name": "kills",
            "type": "u64"
          },
          {
            "name": "nextMonsterIndex",
            "type": "u64"
          },
          {
            "name": "forFutureUse",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          },
          {
            "name": "inventory",
            "type": {
              "vec": {
                "defined": "InventoryItem"
              }
            }
          }
        ]
      }
    },
    {
      "name": "monster",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "player",
            "type": "publicKey"
          },
          {
            "name": "game",
            "type": "publicKey"
          },
          {
            "name": "hitpoints",
            "type": "u64"
          },
          {
            "name": "forFutureUse",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ExampleInventoryItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SomeStruct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bool",
            "type": "bool"
          },
          {
            "name": "sixtyFourBytes",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          }
        ]
      }
    },
    {
      "name": "GameConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxItemsPerPlayer",
            "type": "u8"
          },
          {
            "name": "apPerPlayerCreation",
            "type": "u64"
          },
          {
            "name": "apPerMonsterSpawn",
            "type": "u64"
          },
          {
            "name": "apPerMonsterAttack",
            "type": "u64"
          },
          {
            "name": "forFutureUse",
            "type": {
              "array": [
                "u64",
                13
              ]
            }
          }
        ]
      }
    },
    {
      "name": "InventoryItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "forFutureUse",
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          }
        ]
      }
    }
  ]
};

export const IDL: Architecture = {
  "version": "0.1.0",
  "name": "architecture",
  "instructions": [
    {
      "name": "createGame",
      "accounts": [
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameMaster",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "maxItemsPerPlayer",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createPlayer",
      "accounts": [
        {
          "name": "game",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "playerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "spawnMonster",
      "accounts": [
        {
          "name": "game",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "playerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "monster",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "attackMonster",
      "accounts": [
        {
          "name": "playerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "monster",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositActionPoints",
      "accounts": [
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "conceptSizes",
      "accounts": [
        {
          "name": "allTypes",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "string",
          "type": "string"
        },
        {
          "name": "vectorLength",
          "type": "u8"
        }
      ]
    },
    {
      "name": "conceptBox",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "someBigData",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "conceptZeroCopy",
      "accounts": [
        {
          "name": "someReallyBigData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "conceptDataOptimization",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gameFlagsBad",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gameFlagsGood",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "isFrozen",
          "type": "bool"
        }
      ]
    },
    {
      "name": "conceptForFutureUseV0",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gameState",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "health",
          "type": "u64"
        },
        {
          "name": "mana",
          "type": "u64"
        }
      ]
    },
    {
      "name": "conceptForFutureUseV1",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gameState",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "health",
          "type": "u64"
        },
        {
          "name": "mana",
          "type": "u64"
        },
        {
          "name": "experince",
          "type": "u64"
        }
      ]
    },
    {
      "name": "conceptDataOrder",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gameStateBad",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gameStateGood",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "maxItems",
          "type": "u8"
        }
      ]
    },
    {
      "name": "conceptIndexing",
      "accounts": [
        {
          "name": "single",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "onePerProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "onePerOwner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "multiplePerOwner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "onePerOwnerPerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "accountToPdaFrom",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "multiplePerOwnerIndex",
          "type": "u64"
        }
      ]
    },
    {
      "name": "conceptSharedAccountBottleneck",
      "accounts": [
        {
          "name": "donationTally",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "communityWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lamportsToDonate",
          "type": "u64"
        }
      ]
    },
    {
      "name": "conceptSharedAccount",
      "accounts": [
        {
          "name": "donationTally",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lamportsToDonate",
          "type": "u64"
        }
      ]
    },
    {
      "name": "conceptSharedAccountRedeem",
      "accounts": [
        {
          "name": "donationTally",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "communityWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "someBigDataStruct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bigData",
            "type": {
              "array": [
                "u8",
                2000
              ]
            }
          }
        ]
      }
    },
    {
      "name": "badGameFlags",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isFrozen",
            "type": "bool"
          },
          {
            "name": "isPoisoned",
            "type": "bool"
          },
          {
            "name": "isBurning",
            "type": "bool"
          },
          {
            "name": "isBlessed",
            "type": "bool"
          },
          {
            "name": "isCursed",
            "type": "bool"
          },
          {
            "name": "isStunned",
            "type": "bool"
          },
          {
            "name": "isSlowed",
            "type": "bool"
          },
          {
            "name": "isBleeding",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "goodGameFlags",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "statusFlags",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "badGameState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "items",
            "type": {
              "vec": {
                "defined": "ExampleInventoryItem"
              }
            }
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "level",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "goodGameState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "level",
            "type": "u64"
          },
          {
            "name": "items",
            "type": {
              "vec": {
                "defined": "ExampleInventoryItem"
              }
            }
          }
        ]
      }
    },
    {
      "name": "gameState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "health",
            "type": "u64"
          },
          {
            "name": "mana",
            "type": "u64"
          },
          {
            "name": "forFutureUse",
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          }
        ]
      }
    },
    {
      "name": "someIndexingDataStruct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pdaType",
            "type": "u8"
          },
          {
            "name": "index",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "donationTally",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "lamportsDonated",
            "type": "u64"
          },
          {
            "name": "lamportsToRedeem",
            "type": "u64"
          },
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "dataTypes",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "byte",
            "type": "u8"
          },
          {
            "name": "twoBytes",
            "type": "u16"
          },
          {
            "name": "fourBytes",
            "type": "u32"
          },
          {
            "name": "eightBytes",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "sixteenBytes",
            "type": "u128"
          },
          {
            "name": "thirtyTwoBytes",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "publicKey",
            "type": "publicKey"
          },
          {
            "name": "someStruct",
            "type": {
              "defined": "SomeStruct"
            }
          },
          {
            "name": "someOption",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "fixedString",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          },
          {
            "name": "string",
            "type": "string"
          },
          {
            "name": "vec",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "someReallyBigDataStruct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reallyBigData",
            "type": {
              "array": [
                "u128",
                1024
              ]
            }
          }
        ]
      }
    },
    {
      "name": "game",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gameMaster",
            "type": "publicKey"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          },
          {
            "name": "actionPointsCollected",
            "type": "u64"
          },
          {
            "name": "gameConfig",
            "type": {
              "defined": "GameConfig"
            }
          },
          {
            "name": "forFutureUse",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          }
        ]
      }
    },
    {
      "name": "player",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "player",
            "type": "publicKey"
          },
          {
            "name": "game",
            "type": "publicKey"
          },
          {
            "name": "actionPointsSpent",
            "type": "u64"
          },
          {
            "name": "actionPointsToBeCollected",
            "type": "u64"
          },
          {
            "name": "statusFlag",
            "type": "u8"
          },
          {
            "name": "experince",
            "type": "u64"
          },
          {
            "name": "kills",
            "type": "u64"
          },
          {
            "name": "nextMonsterIndex",
            "type": "u64"
          },
          {
            "name": "forFutureUse",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          },
          {
            "name": "inventory",
            "type": {
              "vec": {
                "defined": "InventoryItem"
              }
            }
          }
        ]
      }
    },
    {
      "name": "monster",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "player",
            "type": "publicKey"
          },
          {
            "name": "game",
            "type": "publicKey"
          },
          {
            "name": "hitpoints",
            "type": "u64"
          },
          {
            "name": "forFutureUse",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ExampleInventoryItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SomeStruct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bool",
            "type": "bool"
          },
          {
            "name": "sixtyFourBytes",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          }
        ]
      }
    },
    {
      "name": "GameConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxItemsPerPlayer",
            "type": "u8"
          },
          {
            "name": "apPerPlayerCreation",
            "type": "u64"
          },
          {
            "name": "apPerMonsterSpawn",
            "type": "u64"
          },
          {
            "name": "apPerMonsterAttack",
            "type": "u64"
          },
          {
            "name": "forFutureUse",
            "type": {
              "array": [
                "u64",
                13
              ]
            }
          }
        ]
      }
    },
    {
      "name": "InventoryItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "forFutureUse",
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          }
        ]
      }
    }
  ]
};
