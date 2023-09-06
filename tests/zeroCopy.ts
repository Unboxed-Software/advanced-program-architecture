import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { Architecture } from "../target/types/architecture"
import { printLogInstruction } from "./utils"

describe("Concept: Zero Copy", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env())

  const program = anchor.workspace.Architecture as Program<Architecture>
  const wallet = anchor.workspace.Architecture.provider.wallet
    .payer as anchor.web3.Keypair

  it("Exploring Zero Copy", async () => {
    const someReallyBigData = anchor.web3.Keypair.generate()

    const accountSize = 16_384 + 8
    const ix = anchor.web3.SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: someReallyBigData.publicKey,
      lamports:
        await program.provider.connection.getMinimumBalanceForRentExemption(
          accountSize
        ),
      space: accountSize,
      programId: program.programId,
    })

    const txHash = await program.methods
      .conceptZeroCopy()
      .accounts({
        owner: wallet.publicKey,
        someReallyBigData: someReallyBigData.publicKey,
      })
      .signers([someReallyBigData])
      .preInstructions([ix])
      .rpc()

    await program.provider.connection.confirmTransaction(txHash)

    // Print out if you'd like
    // const account = await program.account.someReallyBigDataStruct.fetch(someReallyBigData.publicKey);

    printLogInstruction("zero copy", txHash)
  })
})
