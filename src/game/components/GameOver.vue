<script setup lang="ts">
import { gameState } from '../business/GameState'
</script>

<template>
    <div v-if="gameState.winner" class="game-over">
        Game Over
        <div v-if="gameState.winner === 'draw'">Draw</div>
        <div v-else>Winner is {{ gameState.winner }}</div>
    </div>
</template>

<style scoped>
.game-over {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 4rem;
    font-weight: bold;
    line-height: 0.9em;
}
</style>