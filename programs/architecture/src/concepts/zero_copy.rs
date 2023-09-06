use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct ConceptZeroCopy<'info> {

    // Need to have already created the account
    // Cannot call init here
    #[account(zero)]
    pub some_really_big_data: AccountLoader<'info, SomeReallyBigDataStruct>,
    #[account(mut)]
    pub owner: Signer<'info>,
}

#[account(zero_copy)]
pub struct SomeReallyBigDataStruct {
    pub really_big_data: [u128; 1024], // 16,384 bytes
}

pub fn run_concept_zero_copy(ctx: Context<ConceptZeroCopy>) -> Result<()> {

    let some_really_big_data = &mut ctx.accounts.some_really_big_data.load_init()?;
    let last_index = some_really_big_data.really_big_data.len() - 1;
    some_really_big_data.really_big_data[last_index] = 0x01_23_45_67_89_AB_CD_EF;  // or whatever value you want

    Ok(())
}