use anchor_lang::prelude::*;

// For a good breakdown: https://book.anchor-lang.com/anchor_references/space.html

#[derive(Accounts)]
#[instruction(
    string: String,
    vector_length: u8,
)]
pub struct ConceptSizes<'info> {
    #[account(
        init,
        payer = owner,
        space = std::mem::size_of::<DataTypes>() 
            + string.len()
            + vector_length as usize
            + 8
    )]
    pub all_types: Account<'info, DataTypes>,

    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account()]                            // 8 bytes ( Account Descriminator )
pub struct DataTypes {           
    pub byte: u8,                       // 1 byte
    pub two_bytes: u16,                 // 2 bytes
    pub four_bytes: u32,                // 4 bytes
    pub eight_bytes: u64,               // 8 bytes          
    pub timestamp: i64,                 // 8 bytes
    pub sixteen_bytes: u128,            // 16 bytes
    pub thirty_two_bytes: [u8; 32],     // 32 bytes
    pub public_key: Pubkey,             // 32 bytes

    pub some_struct: SomeStruct,        // std::mem::size_of::<SomeStruct>() -> 65 bytes

    pub some_option: Option<u8>,        // 1 + size of u8

    pub fixed_string: [u8; 64],         // 64 bytes

    pub string: String,                 // 4 + (length of string)
    pub vec: Vec<u8>,                   // 4 + (length of vec * size of u8)
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct SomeStruct {
    pub bool: bool,                     // 1 byte
    pub sixty_four_bytes: [u8; 64],     // 64 bytes
}

pub fn run_concept_sizes(ctx: Context<ConceptSizes>, string: String, vector_length: u8) -> Result<()> {

    let all_types = &mut ctx.accounts.all_types;

    all_types.byte = 0x11;
    all_types.two_bytes = 0x2222;
    all_types.four_bytes = 0x44444444;
    all_types.eight_bytes = 0x8888888888888888;
    all_types.timestamp = Clock::get()?.unix_timestamp;
    all_types.sixteen_bytes = 0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa;
    all_types.thirty_two_bytes = [0x32; 32];
    all_types.public_key = ctx.accounts.owner.key().clone();

    all_types.some_struct = SomeStruct {
        bool: true,
        sixty_four_bytes: [0x64; 64],
    };

    all_types.some_option = Some(0x11);
    // all_types.some_option = None(); // This will also work

    all_types.fixed_string[..string.len().min(64)].copy_from_slice(string.as_bytes());

    all_types.string = string.clone();
    all_types.vec = vec![0x55; vector_length as usize]; 

    msg!("Size of account = {}", std::mem::size_of::<DataTypes>() 
        + string.len()
        + vector_length as usize
        + 8 // account discriminator
    );

    Ok(())
}
