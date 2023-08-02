export function printLogInstruction(
    title: string,
    txHash: string
  ){
    console.log(`\n---- CONCEPT ${title.toUpperCase()} ------\n`)
    console.log('To see logs with \`anchor test\`:');
    console.log('Open file .anchor/program-logs/*.architecture.log\n');
    console.log('To see logs with \`anchor test --skip-local-validator\`:');
    console.log(`solana confirm -v ${txHash}`);
    console.log(`\n---------------------------------------------\n`)
  }