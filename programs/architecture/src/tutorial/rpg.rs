use anchor_lang::prelude::*;
use anchor_lang::system_program::{Transfer, transfer};

// SOLUTION EDIT: Added in an item drop
const ITEM_NAME: [u8; 32] = [
    b'b', b'r', b'o', b'n', b'z', b'e', b',', b' ', b's', b'p', b'e', b'a', b'r',
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

#[account]
pub struct Game { // 8 bytes
    pub game_master: Pubkey,            // 32 bytes
    pub treasury: Pubkey,               // 32 bytes

    pub action_points_collected: u64,   // 8 bytes
    
    pub game_config: GameConfig,

    pub for_future_use: [u8; 256],      // Rewards?? Creators?? NFT?? ?? RNG Seeds??
}

#[account]
pub struct Player { // 8 bytes
    pub player: Pubkey,                 // 32 bytes
    pub game: Pubkey,                   // 32 bytes

    pub action_points_spent: u64,               // 8 bytes
    pub action_points_to_be_collected: u64,     // 8 bytes

    pub status_flag: u8,                // 8 bytes
    pub experince: u64,                 // 8 bytes
    pub kills: u64,                     // 8 bytes
    pub next_monster_index: u64,        // 8 bytes

    pub for_future_use: [u8; 256],      // Attack/Speed/Defense/Health/Mana?? Metadata??

    pub inventory: Vec<InventoryItem>,  // Max 8 items
}

#[account]
pub struct Monster { // 8 bytes
    pub player: Pubkey,                 // 32 bytes
    pub game: Pubkey,                   // 32 bytes

    pub hitpoints: u64,                 // 8 bytes

    pub for_future_use: [u8; 256],      // Items to drop?? Hitpoints?? Metadata?? Hitpoints??
}

// ----------- GAME CONFIG ----------

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct GameConfig {
    pub max_items_per_player: u8,
    
    // SOLUTION EDIT:
    pub ap_per_player_creation: u64,
    pub ap_per_monster_spawn: u64,
    pub ap_per_monster_attack: u64,

    // SOLUTION EDIT: 16 -> 13
    pub for_future_use: [u64; 13], // Health of Enimies?? Experince per item?? Action Points per Action??
}

// ----------- STATUS ----------

// const IS_FROZEN_FLAG: u8 = 1 << 0;
// const IS_POISONED_FLAG: u8 = 1 << 1;
// const IS_BURNING_FLAG: u8 = 1 << 2;
// const IS_BLESSED_FLAG: u8 = 1 << 3;
const IS_CURSED_FLAG: u8 = 1 << 4;
// const IS_STUNNED_FLAG: u8 = 1 << 5;
// const IS_SLOWED_FLAG: u8 = 1 << 6;
// const IS_BLEEDING_FLAG: u8 = 1 << 7;
const NO_EFFECT_FLAG: u8 = 0b00000000;

// ----------- INVENTORY ----------

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct InventoryItem {
    pub name: [u8; 32], // Fixed Name up to 32 bytes
    pub amount: u64,
    pub for_future_use: [u8; 128], // Metadata?? // Effects // Flags?
}

// ----------- HELPER ----------

pub fn spend_action_point<'info>(
    action_points: u64, 
    player_account: &mut Account<'info, Player>,
    player: &AccountInfo<'info>, 
    system_program: &AccountInfo<'info>, 
) -> Result<()> {

    player_account.action_points_spent = player_account.action_points_spent.checked_add(action_points).unwrap();
    player_account.action_points_to_be_collected = player_account.action_points_to_be_collected.checked_add(action_points).unwrap();

    let cpi_context = CpiContext::new(
        system_program.clone(), 
        Transfer {
            from: player.clone(),
            to: player_account.to_account_info().clone(),
        });
    transfer(cpi_context, action_points)?;

    msg!("Minus {} action points", action_points);

    Ok(())
}

// ----------- CREATE GAME ----------
#[derive(Accounts)]
pub struct CreateGame<'info> {
    #[account(
        init, 
        seeds=[b"GAME", treasury.key().as_ref()],
        bump,
        payer = game_master, 
        space = std::mem::size_of::<Game>()+ 8
    )]
    pub game: Account<'info, Game>,

    #[account(mut)]
    pub game_master: Signer<'info>,

    /// CHECK: Need to know they own the treasury
    pub treasury: Signer<'info>,
    pub system_program: Program<'info, System>,
}


pub fn run_create_game(
    ctx: Context<CreateGame>, 
    max_items_per_player: u8, 
    // SOLUTION EDIT: added game config ( could make this a struct )
    ap_per_player_creation: u64,
    ap_per_monster_spawn: u64,
    ap_per_monster_attack: u64,
) -> Result<()> {

    ctx.accounts.game.game_master = ctx.accounts.game_master.key().clone();
    ctx.accounts.game.treasury = ctx.accounts.treasury.key().clone();

    ctx.accounts.game.action_points_collected = 0;
    ctx.accounts.game.game_config.max_items_per_player = max_items_per_player;
    // SOLUTION EDIT:
    ctx.accounts.game.game_config.ap_per_player_creation = ap_per_player_creation;
    ctx.accounts.game.game_config.ap_per_monster_spawn = ap_per_monster_spawn;
    ctx.accounts.game.game_config.ap_per_monster_attack = ap_per_monster_attack;

    msg!("Game created!");

    Ok(())
}

// ----------- CREATE PLAYER ----------
#[derive(Accounts)]
pub struct CreatePlayer<'info> {
    pub game: Box<Account<'info, Game>>,

    #[account(
        init, 
        seeds=[
            b"PLAYER", 
            game.key().as_ref(), 
            player.key().as_ref()
        ], 
        bump, 
        payer = player, 
        space = std::mem::size_of::<Player>() + std::mem::size_of::<InventoryItem>() * game.game_config.max_items_per_player as usize + 8)
    ]
    pub player_account: Account<'info, Player>,

    #[account(mut)]
    pub player: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn run_create_player(ctx: Context<CreatePlayer>) -> Result<()> {

    ctx.accounts.player_account.player = ctx.accounts.player.key().clone();
    ctx.accounts.player_account.game = ctx.accounts.game.key().clone();

    ctx.accounts.player_account.status_flag = NO_EFFECT_FLAG;
    ctx.accounts.player_account.experince = 0;
    ctx.accounts.player_account.kills = 0;

    msg!("Hero has entered the game!");

    {
        // SOLUTION EDIT:
        let action_point_to_spend = ctx.accounts.game.game_config.ap_per_player_creation;

        spend_action_point(
            action_point_to_spend, 
            &mut ctx.accounts.player_account,
            &ctx.accounts.player.to_account_info(), 
            &ctx.accounts.system_program.to_account_info()
        )?;
    }


    Ok(())
}

// ----------- SPAWN MONSTER ----------
#[derive(Accounts)]
pub struct SpawnMonster<'info> {
    pub game: Box<Account<'info, Game>>,

    #[account(mut,
        has_one = game,
        has_one = player,
    )]
    pub player_account: Box<Account<'info, Player>>,

    #[account(
        init, 
        seeds=[
            b"MONSTER", 
            game.key().as_ref(), 
            player.key().as_ref(),
            player_account.next_monster_index.to_le_bytes().as_ref()
        ], 
        bump, 
        payer = player, 
        space = std::mem::size_of::<Monster>() + 8)
    ]
    pub monster: Account<'info, Monster>,

    #[account(mut)]
    pub player: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn run_spawn_monster(ctx: Context<SpawnMonster>) -> Result<()> {

    {
        ctx.accounts.monster.player = ctx.accounts.player.key().clone();
        ctx.accounts.monster.game = ctx.accounts.game.key().clone();
        ctx.accounts.monster.hitpoints = 100;

        msg!("Monster Spawned!");
    }


    {
        ctx.accounts.player_account.next_monster_index = ctx.accounts.player_account.next_monster_index.checked_add(1).unwrap();
    }

    { 
        // SOLUTION EDIT:
        let action_point_to_spend = ctx.accounts.game.game_config.ap_per_monster_spawn;

        spend_action_point(
            action_point_to_spend, 
            &mut ctx.accounts.player_account,
            &ctx.accounts.player.to_account_info(), 
            &ctx.accounts.system_program.to_account_info()
        )?;
    }


    Ok(())
}

// ----------- ATTACK MONSTER ----------
#[derive(Accounts)]
pub struct AttackMonster<'info> {
     // SOLUTION EDIT:
    pub game: Box<Account<'info, Game>>,

    #[account(
        mut,
        has_one = player,
        // SOLUTION EDIT:
        has_one = game,
    )]
    pub player_account: Box<Account<'info, Player>>,

    #[account(
        mut,
        has_one = player,
        constraint = monster.game == player_account.game
    )]
    pub monster: Box<Account<'info, Monster>>,

    #[account(mut)]
    pub player: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn run_attack_monster(ctx: Context<AttackMonster>) -> Result<()> {

    let mut did_kill = false;

    {
        let hp_before_attack =  ctx.accounts.monster.hitpoints;
        let hp_after_attack = ctx.accounts.monster.hitpoints.saturating_sub(1);
        let damage_dealt = hp_before_attack - hp_after_attack;
        ctx.accounts.monster.hitpoints = hp_after_attack;

        

        if hp_before_attack > 0 && hp_after_attack == 0 {
            did_kill = true;
        }

        if  damage_dealt > 0 {
            msg!("Damage Dealt: {}", damage_dealt);
        } else {
            msg!("Stop it's already dead!");

            // SOLUTION EDIT:
            ctx.accounts.player_account.status_flag |= IS_CURSED_FLAG;
        }
    }

    {
        ctx.accounts.player_account.experince = ctx.accounts.player_account.experince.saturating_add(1);
        msg!("+1 EXP");

        if did_kill {
            ctx.accounts.player_account.kills = ctx.accounts.player_account.kills.saturating_add(1);
            msg!("You killed the monster!");

            // SOLUTION EDIT:
            if ctx.accounts.player_account.inventory.len() < ctx.accounts.game.game_config.max_items_per_player as usize {
                ctx.accounts.player_account.inventory.push(
                    InventoryItem { 
                        name: ITEM_NAME.clone(), 
                        amount: 1, 
                        for_future_use: [0; 128]
                    }
                );
                msg!("You looted the monster!");
            } else {
                msg!("You can't loot the monster, your inventory is full!");
            }
        }
    }


    { 
        // SOLUTION EDIT:
        let action_point_to_spend = ctx.accounts.game.game_config.ap_per_monster_attack;

        spend_action_point(
            action_point_to_spend, 
            &mut ctx.accounts.player_account,
            &ctx.accounts.player.to_account_info(), 
            &ctx.accounts.system_program.to_account_info()
        )?;
    }


    Ok(())
}

// ----------- REDEEM TO TREASUREY ----------
#[derive(Accounts)]
pub struct CollectActionPoints<'info> {

    #[account(
        mut,
        has_one=treasury
    )]
    pub game: Box<Account<'info, Game>>,

    #[account(
        mut,
        has_one=game
    )]
    pub player: Box<Account<'info, Player>>,

    #[account(mut)]
    /// CHECK: It's being checked in the game account
    pub treasury: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}

// literally anyone who pays for the TX fee can run this command - give it to a clockwork bot
pub fn run_collect_action_points(ctx: Context<CollectActionPoints>) -> Result<()> {
    let transfer_amount: u64 = ctx.accounts.player.action_points_to_be_collected;

    **ctx.accounts.player.to_account_info().try_borrow_mut_lamports()? -= transfer_amount;
    **ctx.accounts.treasury.to_account_info().try_borrow_mut_lamports()? += transfer_amount;

    ctx.accounts.player.action_points_to_be_collected = 0;

    ctx.accounts.game.action_points_collected = ctx.accounts.game.action_points_collected.checked_add(transfer_amount).unwrap();

    msg!("The treasury collected {} action points to treasury", transfer_amount);

    Ok(())
}