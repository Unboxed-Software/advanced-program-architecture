use anchor_lang::prelude::*;


#[derive(Accounts)]
pub struct ConceptForFutureUse<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        init_if_needed,
        payer = owner,
        space = std::mem::size_of::<GameState>() + 8,
    )]
    pub game_state: Account<'info, GameState>,

    pub system_program: Program<'info, System>,
}


#[account]
pub struct GameState {
    pub health: u64,
    pub mana: u64,

    // V0 
    pub for_future_use: [u8; 128], // Enough for 4 pubkeys

    // V1
    // pub experince: u64,
    // pub for_future_use: [u8; 120], // Enough for 4 pubkeys
}

pub fn run_concept_for_future_use_v0(ctx: Context<ConceptForFutureUse>, health: u64, mana: u64) -> Result<()> {

    ctx.accounts.game_state.health = health;
    ctx.accounts.game_state.mana = mana;

    Ok(())
}



pub fn run_concept_for_future_use_v1(ctx: Context<ConceptForFutureUse>, health: u64, mana: u64, experince: u64) -> Result<()> {

    ctx.accounts.game_state.health = health;
    ctx.accounts.game_state.mana = mana;

    // If you were to change GameState to V1
    // ctx.accounts.game_state.experince = experince;

    // -- or --
    ctx.accounts.game_state.for_future_use[0..8].copy_from_slice(&experince.to_le_bytes());

    Ok(())
}