use anchor_lang::prelude::*;


#[derive(Accounts)]
pub struct ConceptDataOptimization<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        init,
        payer = owner,
        space = std::mem::size_of::<BadGameFlags>() + 8,
    )]
    pub game_flags_bad: Account<'info, BadGameFlags>,

    #[account(
        init,
        payer = owner,
        space = std::mem::size_of::<GoodGameFlags>() + 8,
    )]
    pub game_flags_good: Account<'info, GoodGameFlags>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct BadGameFlags { // 8 bytes
    pub is_frozen: bool,
    pub is_poisoned: bool,
    pub is_burning: bool,
    pub is_blessed: bool,
    pub is_cursed: bool,
    pub is_stunned: bool,
    pub is_slowed: bool,
    pub is_bleeding: bool,
}

const IS_FROZEN_FLAG: u8 = 1 << 0;
// const IS_POISONED_FLAG: u8 = 1 << 1;
// const IS_BURNING_FLAG: u8 = 1 << 2;
// const IS_BLESSED_FLAG: u8 = 1 << 3;
// const IS_CURSED_FLAG: u8 = 1 << 4;
// const IS_STUNNED_FLAG: u8 = 1 << 5;
// const IS_SLOWED_FLAG: u8 = 1 << 6;
// const IS_BLEEDING_FLAG: u8 = 1 << 7;
const NO_EFFECT_FLAG: u8 = 0b00000000;
#[account]
pub struct GoodGameFlags { // 1 byte
    pub status_flags: u8, 
}

pub fn run_concept_data_optimization(
    ctx: Context<ConceptDataOptimization>, 
        is_frozen: bool,
        // ... Rest of status effects
        // Or pass in the flags
        // Or pass in options
    ) -> Result<()> {

    ctx.accounts.game_flags_bad.is_frozen = is_frozen;
    // ... Rest of status effects

    ctx.accounts.game_flags_good.status_flags |= if is_frozen { IS_FROZEN_FLAG } else { NO_EFFECT_FLAG };
    // ... Rest of status effects

    Ok(())
}
