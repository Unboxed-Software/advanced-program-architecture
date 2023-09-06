import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { Architecture } from "../target/types/architecture"
import { printLogInstruction } from "./utils"
import { assert } from "chai"

describe("Concept: Box", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env())

  const program = anchor.workspace.Architecture as Program<Architecture>
  const wallet = anchor.workspace.Architecture.provider.wallet
    .payer as anchor.web3.Keypair

  it("Exploring Box", async () => {
    const someBigData = anchor.web3.Keypair.generate()

    const txHash = await program.methods
      .conceptBox()
      .accounts({
        owner: wallet.publicKey,
        someBigData: someBigData.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([someBigData])
      .rpc()

    await program.provider.connection.confirmTransaction(txHash)

    // Print out if you'd like
    // const account = await program.account.someBigDataStruct.fetch(someBigData.publicKey);

    printLogInstruction("box", txHash)
  })
})
