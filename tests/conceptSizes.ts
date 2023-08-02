import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Architecture } from "../target/types/architecture";
import { printLogInstruction } from "./utils";



describe("Concept Sizes", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Architecture as Program<Architecture>;
  const wallet = anchor.workspace.Architecture.provider.wallet.payer as anchor.web3.Keypair;

  it("Exploring Sizes", async () => {

    const allTypes = anchor.web3.Keypair.generate();

      const txHash = await program.methods.conceptSizes(
        "This is a string",
        5 // Vector Length
    ).accounts({
      owner: wallet.publicKey,
      allTypes: allTypes.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([
     allTypes,
    ])
    .rpc()

    await program.provider.connection.confirmTransaction(txHash);

    // Print out if you'd like
    // const account = await program.account.dataTypes.fetch(allTypes.publicKey);

    printLogInstruction('sizes', txHash);

  });

});



