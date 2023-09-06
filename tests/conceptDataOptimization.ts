import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { Architecture } from "../target/types/architecture"
import { printLogInstruction } from "./utils"
import { assert } from "chai"

describe("Concept: Data Optimization", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env())

  const program = anchor.workspace.Architecture as Program<Architecture>
  const wallet = anchor.workspace.Architecture.provider.wallet
    .payer as anchor.web3.Keypair

  it("Exploring Optimization", async () => {
    const gameFlagsBad = anchor.web3.Keypair.generate()
    const gameFlagsGood = anchor.web3.Keypair.generate()

    const isFrozen = true

    const txHash = await program.methods
      .conceptDataOptimization(isFrozen)
      .accounts({
        owner: wallet.publicKey,
        gameFlagsBad: gameFlagsBad.publicKey,
        gameFlagsGood: gameFlagsGood.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([gameFlagsBad, gameFlagsGood])
      .rpc()

    await program.provider.connection.confirmTransaction(txHash)

    // Print out if you'd like
    // const badAccount = await program.account.badGameFlags.fetch(gameFlagsBad.publicKey);
    // const goodAccount = await program.account.goodGameFlags.fetch(gameFlagsGood.publicKey);

    printLogInstruction("data optimization", txHash)
  })
})
