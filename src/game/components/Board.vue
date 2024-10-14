<template>
    <div class="board">
        <Cell
            v-for="(state, i) in gameState.board"
            class="board-cell"
            :state="state"
            :key="`cell-${i}`"
            @click="makeMove(i)"
        />
    </div>
</template>
    
<script setup lang="ts">
import { gameState, makeMove } from '../business/GameState'
import Cell from './Cell.vue'
</script>

<style scoped>
.board {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}
</style>