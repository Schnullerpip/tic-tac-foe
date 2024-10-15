<script setup lang="ts">
defineProps<{ winner: 'x' | 'o' | 'draw' | undefined }>()
</script>

<template>
    <div v-if="winner" class="game-over">
        Game Over
        <div v-if="winner === 'draw'">Draw</div>
        <div v-else>Winner is {{ winner }}</div>
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