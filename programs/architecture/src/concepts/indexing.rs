use anchor_lang::prelude::*;

#[account]
pub struct SomeIndexingDataStruct {
    pda_type: u8,
    index: Option<u64>,
}

#[derive(Accounts)]
#[instruction(multiple_per_owner_index: u64)]
pub struct ConceptIndexing<'info> {

    #[account(
        init, 
        payer = owner, 
        space= std::mem::size_of::<SomeIndexingDataStruct>() + 8 
    )]
    pub single: Account<'info, SomeIndexingDataStruct>,

    #[account(
        init, 
        seeds=[b"ONE PER PROGRAM"],
        bump,
        payer = owner, 
        space= std::mem::size_of::<SomeIndexingDataStruct>() + 8 
    )]
    pub one_per_program: Account<'info, SomeIndexingDataStruct>,

    #[account(
        init, 
        seeds=[b"ONE PER OWNER", owner.key().as_ref()],
        bump,
        payer = owner, 
        space= std::mem::size_of::<SomeIndexingDataStruct>() + 8 
    )]
    pub one_per_owner: Account<'info, SomeIndexingDataStruct>,

    #[account(
        init, 
        seeds=[b"MULTIPLE PER OWNER", owner.key().as_ref(), multiple_per_owner_index.to_be_bytes().as_ref()],
        bump,
        payer = owner, 
        space= std::mem::size_of::<SomeIndexingDataStruct>() + 8 
    )]
    pub multiple_per_owner: Account<'info, SomeIndexingDataStruct>,

    #[account(
        init, 
        seeds=[b"ONE PER OWNER PER ACCOUNT", owner.key().as_ref(), account_to_pda_from.key().as_ref()],
        bump,
        payer = owner, 
        space= std::mem::size_of::<SomeIndexingDataStruct>() + 8 
    )]
    pub one_per_owner_per_account: Account<'info, SomeIndexingDataStruct>,

    /// CHECK: 
    pub account_to_pda_from: UncheckedAccount<'info>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn run_concept_indexing(ctx: Context<ConceptIndexing>, multiple_per_owner_index: u64) -> Result<()> {

    ctx.accounts.single.pda_type = 0x01;
    ctx.accounts.one_per_program.pda_type = 0x02;
    ctx.accounts.one_per_owner.pda_type = 0x03;
    ctx.accounts.multiple_per_owner.pda_type = 0x04;
    ctx.accounts.multiple_per_owner.index = Some(multiple_per_owner_index);
    ctx.accounts.one_per_owner_per_account.pda_type = 0x05;

    Ok(())
}