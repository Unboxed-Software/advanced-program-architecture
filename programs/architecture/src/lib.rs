use anchor_lang::prelude::*;
use anchor_lang::solana_program::log::sol_log_compute_units;

declare_id!("J2PcgrJuD5H2iEM1RrwNtr2jVYP5MxuEjWk8V9nhZxUB");

use concepts::sizes::*;
use concepts::_box::*;
use concepts::zero_copy::*;
use concepts::data_optimization::*;
use concepts::for_future_use::*;
use concepts::data_order::*;
use concepts::indexing::*;
use concepts::shared_account::*;
use tutorial::rpg::*;

mod concepts;
mod tutorial;

#[program]
pub mod architecture {
    use super::*;

    // ----------- TUTORIAL PROGRAM ------------------

    pub fn create_game(ctx: Context<CreateGame>, max_items_per_player: u8) -> Result<()> {
        run_create_game(ctx, max_items_per_player)?;
        sol_log_compute_units();
        Ok(())
    }

    pub fn create_player(ctx: Context<CreatePlayer>) -> Result<()> {
        run_create_player(ctx)?;
        sol_log_compute_units();
        Ok(())
    }

    pub fn spawn_monster(ctx: Context<SpawnMonster>) -> Result<()> {
        run_spawn_monster(ctx)?;
        sol_log_compute_units();
        Ok(())
    }

    pub fn attack_monster(ctx: Context<AttackMonster>) -> Result<()> {
        run_attack_monster(ctx)?;
        sol_log_compute_units();
        Ok(())
    }

    pub fn deposit_action_points(ctx: Context<CollectActionPoints>) -> Result<()> {
        run_collect_action_points(ctx)?;
        sol_log_compute_units();
        Ok(())
    }

    // ----------- CONCEPTS: DEALING WITH SIZE ------------------

    pub fn concept_sizes(ctx: Context<ConceptSizes>, string: String, vector_length: u8) -> Result<()> {
        run_concept_sizes(ctx, string, vector_length)?;
        sol_log_compute_units();
        Ok(())
    }

    pub fn concept_box(ctx: Context<ConceptBox>) -> Result<()> {
        run_concept_box(ctx)?;
        sol_log_compute_units();
        Ok(())
    }

    pub fn concept_zero_copy(ctx: Context<ConceptZeroCopy>) -> Result<()> {
        run_concept_zero_copy(ctx)?;
        sol_log_compute_units();
        Ok(())
    }

    // ----------- CONCEPTS: DEALING WITH ACCOUNTS ------------------

    pub fn concept_data_optimization(ctx: Context<ConceptDataOptimization>, is_frozen: bool,) -> Result<()> {
        run_concept_data_optimization(ctx, is_frozen)?;
        sol_log_compute_units();
        Ok(())
    }

    pub fn concept_for_future_use_v0(ctx: Context<ConceptForFutureUse>, health: u64, mana: u64) -> Result<()> {
        run_concept_for_future_use_v0(ctx, health, mana)?;
        sol_log_compute_units();
        Ok(())
    }

    pub fn concept_for_future_use_v1(ctx: Context<ConceptForFutureUse>, health: u64, mana: u64, experince: u64) -> Result<()> {
        run_concept_for_future_use_v1(ctx, health, mana, experince)?;
        sol_log_compute_units();
        Ok(())
    }

    pub fn concept_data_order(ctx: Context<ConceptDataOrder>, max_items: u8) -> Result<()> {
        run_concept_data_order(ctx, max_items)?;
        sol_log_compute_units();
        Ok(())
    }

    pub fn concept_indexing(ctx: Context<ConceptIndexing>, multiple_per_owner_index: u64,) -> Result<()> {
        run_concept_indexing(ctx, multiple_per_owner_index)?;
        sol_log_compute_units();
        Ok(())
    }

    // ----------- CONCEPTS: DEALING WITH CONCURRENCY ---------------

    pub fn concept_shared_account_bottleneck(ctx: Context<ConceptSharedAccountBottleneck>, lamports_to_donate: u64) -> Result<()> {
        run_concept_shared_account_bottleneck(ctx, lamports_to_donate)?;
        sol_log_compute_units();
        Ok(())
    }

    pub fn concept_shared_account(ctx: Context<ConceptSharedAccount>, lamports_to_donate: u64) -> Result<()> {
        run_concept_shared_account(ctx, lamports_to_donate)?;
        sol_log_compute_units();
        Ok(())
    }

    pub fn concept_shared_account_redeem(ctx: Context<ConceptSharedAccountRedeem>) -> Result<()> {
        run_concept_shared_account_redeem(ctx)?;
        sol_log_compute_units();
        Ok(())
    }
}
