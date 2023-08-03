use anchor_lang::prelude::*;


#[derive(Accounts)]
#[instruction(max_items: u8)]
pub struct ConceptDataOrder<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        init,
        payer = owner,
        space = std::mem::size_of::<BadGameState>() + 
        std::mem::size_of::<ExampleInventoryItem>() * max_items as usize + 
        8,
    )]
    pub game_state_bad: Account<'info, BadGameState>,

    #[account(
        init,
        payer = owner,
        space = std::mem::size_of::<GoodGameState>() + 
        std::mem::size_of::<ExampleInventoryItem>() * max_items as usize + 
        8,
    )]
    pub game_state_good: Account<'info, GoodGameState>,

    pub system_program: Program<'info, System>,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ExampleInventoryItem {
    pub name: [u8; 32], // Fixed Name up to 32 bytes
    pub amount: u64,
}

#[account]
pub struct BadGameState {
    pub items: Vec<ExampleInventoryItem>,
    pub owner: Pubkey,
    pub level: u64,
}

#[account]
pub struct GoodGameState {
    pub owner: Pubkey,
    pub level: u64,
    pub items: Vec<ExampleInventoryItem>,
}

pub fn run_concept_data_order(ctx: Context<ConceptDataOrder>, max_items: u8) -> Result<()> {

    ctx.accounts.game_state_bad.owner = ctx.accounts.owner.key().clone();
    ctx.accounts.game_state_good.owner = ctx.accounts.owner.key().clone();

    ctx.accounts.game_state_bad.level = 0;
    ctx.accounts.game_state_good.level = 0;

    for i in 0..max_items {
        let mut item = ExampleInventoryItem {
            name: [0; 32],
            amount: 0,
        };

        let item_name = format!("Item #{}", i);
        let bytes = item_name.as_bytes();
        item.name[..bytes.len()].copy_from_slice(bytes);

        ctx.accounts.game_state_bad.items.push(item.clone());
        ctx.accounts.game_state_good.items.push(item.clone());
    }

    Ok(())
}