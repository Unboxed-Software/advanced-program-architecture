import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { Architecture } from "../target/types/architecture"
import { printLogInstruction } from "./utils"

describe("Concept: Indexing", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env())

  const program = anchor.workspace.Architecture as Program<Architecture>
  const wallet = anchor.workspace.Architecture.provider.wallet
    .payer as anchor.web3.Keypair

  it("Exploring Indexing", async () => {
    const single = anchor.web3.Keypair.generate()

    const [onePerProgram] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("ONE PER PROGRAM")],
      program.programId
    )

    const [onePerOwner] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("ONE PER OWNER"), wallet.publicKey.toBuffer()],
      program.programId
    )

    const multiplePerOwnerIndex = new anchor.BN(1)
    const [multiplePerOwner] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("MULTIPLE PER OWNER"),
        wallet.publicKey.toBuffer(),
        multiplePerOwnerIndex.toBuffer("be", 8),
      ],
      program.programId
    )

    const someAccountToIndexOffOf = anchor.web3.Keypair.generate()
    const [onePerOwnerPerAccount] =
      anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("ONE PER OWNER PER ACCOUNT"),
          wallet.publicKey.toBuffer(),
          someAccountToIndexOffOf.publicKey.toBuffer(),
        ],
        program.programId
      )

    // ---------- INITIALIZE ACCOUNTS ----------
    const accountSize = 0
    const ix = anchor.web3.SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: someAccountToIndexOffOf.publicKey,
      lamports:
        await program.provider.connection.getMinimumBalanceForRentExemption(
          accountSize
        ),
      space: accountSize,
      programId: program.programId,
    })

    const txHash = await program.methods
      .conceptIndexing(multiplePerOwnerIndex)
      .accounts({
        owner: wallet.publicKey,
        single: single.publicKey,
        onePerProgram,
        onePerOwner,
        multiplePerOwner,
        onePerOwnerPerAccount,
        accountToPdaFrom: someAccountToIndexOffOf.publicKey,
      })
      .signers([single, someAccountToIndexOffOf])
      .preInstructions([ix])
      .rpc()

    await program.provider.connection.confirmTransaction(txHash)

    // Print out the account if you'd like
    // const account = await program.account.someIndexingDataStruct.fetch(single.publicKey);

    printLogInstruction("indexing", txHash)
  })
})
