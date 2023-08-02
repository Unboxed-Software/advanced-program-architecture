import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Architecture } from "../target/types/architecture";
import { printLogInstruction } from "./utils";
import { assert } from "chai";


describe("Concept For Future Use", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Architecture as Program<Architecture>;
  const wallet = anchor.workspace.Architecture.provider.wallet.payer as anchor.web3.Keypair;

  it("Exploring Future Use", async () => {

    const gameState = anchor.web3.Keypair.generate();

    const health = new anchor.BN(100);
    const mana = new anchor.BN(100);

    const txHashV0 = await program.methods.conceptForFutureUseV0(
        health,
        mana
    ).accounts({
      owner: wallet.publicKey,
      gameState: gameState.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([
        gameState,
    ])
    .rpc()

    await program.provider.connection.confirmTransaction(txHashV0);

    // Print out if you'd like
    // const gameStateV0Account = await program.account.gameState.fetch(gameState.publicKey);
    printLogInstruction('for future use v0', txHashV0);

    const experince = new anchor.BN(100);

    const txHashV1 = await program.methods.conceptForFutureUseV1(
        health,
        mana,
        experince
    ).accounts({
      owner: wallet.publicKey,
      gameState: gameState.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([
        gameState,
    ])
    .rpc()

    await program.provider.connection.confirmTransaction(txHashV1);

    // Print out if you'd like
    // const gameStateV1Account = await program.account.gameState.fetch(gameState.publicKey);
    printLogInstruction('for future use v1', txHashV1);

  });

});



