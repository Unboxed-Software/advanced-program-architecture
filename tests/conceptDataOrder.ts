import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Architecture } from "../target/types/architecture";
import { printLogInstruction } from "./utils";
import { assert } from "chai";


describe("Concept Data Order", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Architecture as Program<Architecture>;
  const wallet = anchor.workspace.Architecture.provider.wallet.payer as anchor.web3.Keypair;

  it("Exploring Order", async () => {

    const gameStateOrderBad = anchor.web3.Keypair.generate();
    const gameStateOrderGood = anchor.web3.Keypair.generate();

    const maxItems = 3;

    const txHash = await program.methods.conceptDataOrder(
      maxItems
    ).accounts({
      owner: wallet.publicKey,
      gameStateBad: gameStateOrderBad.publicKey,
      gameStateGood: gameStateOrderGood.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([
      gameStateOrderBad,
      gameStateOrderGood
    ])
    .rpc()

    await program.provider.connection.confirmTransaction(txHash);

    const allGoodAccountsOwnedByOwner = await program.account.goodGameState.all([
      {memcmp: {
        offset: 8,
        bytes: wallet.publicKey.toBase58()
      }}
    ]);

    // Can't do this with the bad ordered accounts - you would have to check for every possible length of items

    printLogInstruction('data optimization', txHash);

  });

});



