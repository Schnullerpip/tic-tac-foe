<template>
    <div class="board">
        <Cell
            v-for="(cell, i) in board"
            class="board-cell"
            :cell
            :key="`cell-${i}`"
            @click="emit('clicked-cell', i)"
        />
    </div>
</template>
    
<script setup lang="ts">
import type { GameState } from '../../../shared/model/GameState'
import Cell from './Cell.vue'
defineProps<{ board: GameState['board'] }>()
const emit = defineEmits<(e: 'clicked-cell', i: number) => void>()
</script>

<style scoped>
.board {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
}
</style>