
use std::str::FromStr;
use anchor_lang::{prelude::*, system_program::{Transfer, transfer}};


pub const STATIC_COMMUNITY_WALLET: &str = "JD5C5Bsp3q9jeC5S57QuSCDDfpeKzXvRkfPB3Td6x3Wh";

#[account]
pub struct DonationTally {
    is_initialized: bool,
    lamports_donated: u64,
    lamports_to_redeem: u64,
    owner: Pubkey,
}

#[derive(Accounts)]
pub struct ConceptSharedAccountBottleneck<'info> {

    #[account(
        init_if_needed, 
        seeds=[
            b"TALLY", 
            owner.key().as_ref()
        ], 
        bump, 
        payer = owner, 
        space= std::mem::size_of::<DonationTally>() + 8 
    )]
    pub donation_tally: Account<'info, DonationTally>,

    #[account(mut, address = Pubkey::from_str(STATIC_COMMUNITY_WALLET).unwrap())]
    /// CHECK: This should force the wallet to only be the community wallet
    pub community_wallet: AccountInfo<'info>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}


pub fn run_concept_shared_account_bottleneck(ctx: Context<ConceptSharedAccountBottleneck>, lamports_to_donate: u64) -> Result<()> {

    let donation_tally = &mut ctx.accounts.donation_tally;

    if !donation_tally.is_initialized {
        donation_tally.is_initialized = true;
        donation_tally.owner = ctx.accounts.owner.key();
        donation_tally.lamports_donated = 0;
        donation_tally.lamports_to_redeem = 0;
    }

    let cpi_context = CpiContext::new(
        ctx.accounts.system_program.to_account_info(), 
        Transfer {
            from: ctx.accounts.owner.to_account_info(),
            to: ctx.accounts.community_wallet.to_account_info(),
        });
    transfer(cpi_context, lamports_to_donate)?;
    

    donation_tally.lamports_donated = donation_tally.lamports_donated.checked_add(lamports_to_donate).unwrap();    
    donation_tally.lamports_to_redeem = 0;

    Ok(())
}

// --------- NO BOTTLENECK ------------

#[derive(Accounts)]
pub struct ConceptSharedAccount<'info> {

    #[account(init_if_needed, seeds=[b"TALLY", owner.key().as_ref()], bump, payer = owner, space= std::mem::size_of::<DonationTally>() + 8 )]
    pub donation_tally: Account<'info, DonationTally>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn run_concept_shared_account(ctx: Context<ConceptSharedAccount>, lamports_to_donate: u64) -> Result<()> {

    let donation_tally = &mut ctx.accounts.donation_tally;

    if !donation_tally.is_initialized {
        donation_tally.is_initialized = true;
        donation_tally.owner = ctx.accounts.owner.key();
        donation_tally.lamports_donated = 0;
        donation_tally.lamports_to_redeem = 0;
    }

    let cpi_context = CpiContext::new(
        ctx.accounts.system_program.to_account_info(), 
        Transfer {
            from: ctx.accounts.owner.to_account_info(),
            to: donation_tally.to_account_info(),
        });
    transfer(cpi_context, lamports_to_donate)?;

    donation_tally.lamports_donated = donation_tally.lamports_donated.checked_add(lamports_to_donate).unwrap();    
    donation_tally.lamports_to_redeem = donation_tally.lamports_to_redeem.checked_add(lamports_to_donate).unwrap();

    Ok(())
}

#[derive(Accounts)]
pub struct ConceptSharedAccountRedeem<'info> {

    #[account(mut)]
    pub donation_tally: Account<'info, DonationTally>,

    #[account(mut, address = Pubkey::from_str(STATIC_COMMUNITY_WALLET).unwrap())]
    /// CHECK: This should force the wallet to only be the community wallet
    pub community_wallet: AccountInfo<'info>,

    /// CHECK: Will fail due to the keys above if this is not the owner
    pub owner: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}


pub fn run_concept_shared_account_redeem(ctx: Context<ConceptSharedAccountRedeem>) -> Result<()> {
    let transfer_amount: u64 = ctx.accounts.donation_tally.lamports_donated;

    // Decrease balance in donation_tally account
    **ctx.accounts.donation_tally.to_account_info().try_borrow_mut_lamports()? -= transfer_amount;

    // Increase balance in community_wallet account
    **ctx.accounts.community_wallet.to_account_info().try_borrow_mut_lamports()? += transfer_amount;

    // Reset lamports_donated and lamports_to_redeem
    ctx.accounts.donation_tally.lamports_to_redeem = 0;

    Ok(())
}
