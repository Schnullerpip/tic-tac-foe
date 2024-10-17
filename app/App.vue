<script setup lang="ts">
import Board from './board/components/Board.vue'
import { useBot } from './bot/composables/useBot'
import { useGameState } from './game/composables/useGameState'

const { gameState, makeMove: makePlayerMove } = useGameState()
const { makeBotMove, comment, mood } = useBot(gameState)

async function handleClickCell(i: number) {
	if (gameState.turn !== 'x') {
		return
	}
	makePlayerMove(i)
	makeBotMove()
}
</script>

<template>
    <div class="app-root">
        <!-- Game Over -->
        <!-- TODO 3 use the GameOver component here (tip: give it the game-over class) -->
        <!-- TODO 4 use a vue transition for the GameOver component (tip: give it the fade name) -->

        <!-- Board -->
        <Board class="board" :board=gameState.board @clicked-cell="handleClickCell" />

        <!-- Comment -->
        <!-- TODO 2 use the BotComment component here (tip: give it the comment class) -->
        <!-- TODO 4  use a vue transition for the BotComment component (tip: give it the fade name) (tip: use the mode="out-in" attribute) -->
    </div>
</template>

<!-- TODO 4 fix the .fade-enter-active and .fade-leave-active classe - what is the purpose of the fade transition? -->
<style scoped>
.app-root {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding-top: 250px;
}

.board {
    position: relative;
}

.game-over {
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    height: 100px;
}

.comment {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    padding: 1rem;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
}

.fade-enter-active,
.fade-leave-active {
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

</style>
