use anchor_lang::prelude::*;

#[account]
pub struct SomeBigDataStruct {
    pub big_data: [u8; 2000],
}

#[derive(Accounts)]
pub struct ConceptBox<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,


    #[account(
        init,
        payer = owner,
        space = std::mem::size_of::<SomeBigDataStruct>() + 8,
    )]
    // Without the Box<T> you would have the following error:
    // Stack offset of 4648 exceeded max offset of 4096 by 552 bytes, please minimize large stack variables
    pub some_big_data: Box<Account<'info, SomeBigDataStruct>>,

    pub system_program: Program<'info, System>,
}

// When boxing is not enough, use zero copy, the data still needs to be serialized
pub fn run_concept_box(ctx: Context<ConceptBox>) -> Result<()> {

    let some_big_data = &mut ctx.accounts.some_big_data.big_data;
    let last_index = some_big_data.len() - 1;
    some_big_data[last_index] = 0xFF; // Update the last byte

    Ok(())
}



// Yes, that's a good way to think about it. Even though Anchor is using Box<T> to signify that the data is stored in a heap-like structure in Solana's on-chain memory, the data still has to be serialized and deserialized when it's sent to and from a Solana program. That serialization process has to operate within the BPF VM's stack size limitation.
// It's also important to note that while Box<T> in Rust typically means "heap allocation", in the context of Anchor and Solana, Box<Account<'info, SomeBigDataStruct>> isn't exactly a heap allocation in the traditional sense, but rather a reference to an account that contains the serialized data in Solana's on-chain memory.
// The BPF VM's stack size limit isn't about how much total data can be stored or handled by your program, but rather how much data can be processed in the course of a single function's execution. When a function call exceeds this limit, you run into the errors you've been seeing.
// When you need to handle large amounts of data, you'll often need to split that data across multiple accounts or transactions to avoid exceeding the stack size limit. For very large accounts or complex structures, you can use Anchor's zero-copy deserialization to load the data directly from Solana's on-chain memory to your account structure without needing to copy it to the stack first.


// https://solana.stackexchange.com/questions/4926/when-and-why-to-use-boxed-accounts
// Error: Stack offset of 4656 exceeded max offset of 4096 by 560 bytes, please minimize large stack variables
// Error: Stack offset of 6416 exceeded max offset of 4096 by 2320 bytes, please minimize large stack variables

// You're correct that in general, the Box<T> type in Rust allocates data on the heap. However, Anchor's use of Box<Account<'info, SomeBigDataStruct>> is not quite the same as typical Rust's Box<T>. When interacting with Solana programs, the actual data is stored on-chain in Solana's memory, not in a traditional heap like in a standard Rust environment.
// When it comes to Solana and Anchor, you should think of Box<Account<'info, SomeBigDataStruct>> as a reference to account data. The Box is a way to access on-chain data and manage it in a structured way. Anchor uses this syntax to abstract away the details of reading and writing to the on-chain memory.
// The error message you're seeing relates to Solana's BPF (Berkeley Packet Filter) stack size restrictions. Even though you're using a Box, Solana's BPF virtual machine has a stack size limitation of 4,096 bytes per function call. If a function's stack usage (including local variables and function calls) exceeds this limit, you'll see an error like this. That's why increasing the size of SomeBigDataStruct data field from 2000 to 5000 bytes gives you an error.
// It's not the Box that's causing the problem, but the size of the SomeBigDataStruct data field itself. When Solana performs a transaction, it serializes and sends the entire Account (including the large data array) which needs to fit within the BPF stack size. Even though the Box should mean the large data is on the "heap", it still needs to traverse the BPF stack for serialization and transport.
// To handle larger amounts of data, you might need to use multiple accounts or use some form of pagination to spread the data across multiple transactions.