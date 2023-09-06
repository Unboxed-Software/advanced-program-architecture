import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { Architecture, IDL } from "../target/types/architecture"
import { printLogInstruction } from "./utils"
import { assert } from "chai"

describe("Concept: Shared Account", () => {
  anchor.setProvider(anchor.AnchorProvider.env())

  const program = anchor.workspace.Architecture as Program<Architecture>
  const communityWallet = new anchor.web3.PublicKey(
    "JD5C5Bsp3q9jeC5S57QuSCDDfpeKzXvRkfPB3Td6x3Wh"
  )

  const RUNS = 100 // Number of RPC calls to make in parallel
  const REPETITIONS = 3 // Number of times to repeat the batch of calls ( To average the time )

  console.log(
    "RUNNING TESTS with ",
    RUNS,
    " runs and ",
    REPETITIONS,
    " repetitions"
  )

  it("Exploring Bottleneck ", async () => {
    const runs = RUNS
    const repetitions = REPETITIONS

    let totalTime = 0

    for (let y = 0; y < repetitions; y++) {
      const start = process.hrtime()

      const tempPrograms = await getTempPrograms(program, runs)

      const promises = Array.from({ length: runs }, async (_, i) => {
        const donationTallyAccount = getDonationTallyAccountKey(tempPrograms[i])
        const amountToDonate = new anchor.BN(1)

        return tempPrograms[i].methods
          .conceptSharedAccountBottleneck(amountToDonate)
          .accounts({
            owner: tempPrograms[i].provider.publicKey,
            donationTally: donationTallyAccount,
            communityWallet: communityWallet,
            systemProgram: anchor.web3.SystemProgram.programId,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          })
          .rpc({
            skipPreflight: true,
            maxRetries: 0,
          })
      })

      await Promise.all(promises)

      const diff = process.hrtime(start)
      const timeElapsed = (diff[0] * 1e9 + diff[1]) / 1e6 // converting to milliseconds
      totalTime += timeElapsed
    }

    const averageTime = totalTime / (runs * repetitions)
    console.log(`Bottleneck: Total time: ${totalTime} ms`)
    console.log(`Bottleneck: Average time per donation: ${averageTime} ms`)
  })

  it("Exploring No Bottleneck", async () => {
    const runs = RUNS
    const repetitions = REPETITIONS

    let totalTime = 0

    // Donate to the same account
    for (let y = 0; y < repetitions; y++) {
      const start = process.hrtime()

      const tempPrograms = await getTempPrograms(program, runs)

      const donatePromise = Array.from({ length: runs }, async (_, i) => {
        const donationTallyAccount = getDonationTallyAccountKey(tempPrograms[i])
        const amountToDonate = new anchor.BN(1)

        await tempPrograms[i].methods
          .conceptSharedAccount(amountToDonate)
          .accounts({
            owner: tempPrograms[i].provider.publicKey,
            donationTally: donationTallyAccount,
            systemProgram: anchor.web3.SystemProgram.programId,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          })
          .rpc({
            skipPreflight: true,
            maxRetries: 0,
          })
      })

      await Promise.all(donatePromise)

      const diff = process.hrtime(start)
      const timeElapsed = (diff[0] * 1e9 + diff[1]) / 1e6 // converting to milliseconds
      totalTime += timeElapsed
    }

    const averageTime = totalTime / (runs * repetitions)
    console.log(`Splitting: Total time donating: ${totalTime} ms`)
    console.log(`Splitting: Average time per donation: ${averageTime} ms`)
  })

  it("Exploring No Bottleneck With Redeeming", async () => {
    const runs = RUNS
    const repetitions = REPETITIONS

    let totalTime = 0
    let totalTimeRedeem = 0

    // Donate to the same account
    for (let y = 0; y < repetitions; y++) {
      const start = process.hrtime()

      const tempPrograms = await getTempPrograms(program, runs)

      const donatePromise = Array.from({ length: runs }, async (_, i) => {
        const donationTallyAccount = getDonationTallyAccountKey(tempPrograms[i])
        const amountToDonate = new anchor.BN(1)

        await tempPrograms[i].methods
          .conceptSharedAccount(amountToDonate)
          .accounts({
            owner: tempPrograms[i].provider.publicKey,
            donationTally: donationTallyAccount,
            systemProgram: anchor.web3.SystemProgram.programId,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          })
          .rpc({
            skipPreflight: true,
            maxRetries: 0,
          })
      })

      await Promise.all(donatePromise)

      const diff = process.hrtime(start)
      const timeElapsed = (diff[0] * 1e9 + diff[1]) / 1e6 // converting to milliseconds
      totalTime += timeElapsed

      const startRedeem = process.hrtime()

      const redeemPromises = Array.from({ length: runs }, async (_, i) => {
        const donationTallyAccount = getDonationTallyAccountKey(tempPrograms[i])

        await tempPrograms[i].methods
          .conceptSharedAccountRedeem()
          .accounts({
            owner: tempPrograms[i].provider.publicKey,
            donationTally: donationTallyAccount,
            communityWallet: communityWallet,
            systemProgram: anchor.web3.SystemProgram.programId,
          })
          .rpc({
            skipPreflight: true,
            maxRetries: 0,
          })
      })

      await Promise.all(redeemPromises)

      const diffRedeem = process.hrtime(startRedeem)
      const timeElapsedRedeem = (diffRedeem[0] * 1e9 + diffRedeem[1]) / 1e6 // converting to milliseconds
      totalTimeRedeem += timeElapsedRedeem
    }

    const averageTime = totalTime / (runs * repetitions)
    const averageTimeRedeem = totalTimeRedeem / (runs * repetitions)

    console.log(`Splitting: Total time donating: ${totalTime} ms`)
    console.log(`Splitting: Total time redeeming: ${totalTimeRedeem} ms`)
    console.log(`Splitting: Total time: ${totalTime + totalTimeRedeem} ms`)

    console.log(`Splitting: Average time per donation: ${averageTime} ms`)
    console.log(`Splitting: Average time per redeem: ${averageTimeRedeem} ms`)
  })
})

function getDonationTallyAccountKey(
  program: anchor.Program<Architecture>,
  owner?: anchor.web3.PublicKey
) {
  const [donationTallyAccount, _bump] =
    anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("TALLY"), (owner ?? program.provider.publicKey).toBuffer()],
      program.programId
    )

  return donationTallyAccount
}

async function getTempPrograms(
  program: anchor.Program<Architecture>,
  runs: number
) {
  const programPromise: Promise<Program<Architecture>>[] = Array.from(
    { length: runs },
    async (_, i) => {
      const payer = anchor.web3.Keypair.generate()
      await program.provider.connection.requestAirdrop(
        payer.publicKey,
        anchor.web3.LAMPORTS_PER_SOL
      )

      const tempProvider = new anchor.AnchorProvider(
        program.provider.connection,
        new anchor.Wallet(payer),
        anchor.AnchorProvider.defaultOptions()
      )

      return new anchor.Program<Architecture>(
        IDL,
        program.programId,
        tempProvider
      )
    }
  )

  return Promise.all(programPromise)
}
