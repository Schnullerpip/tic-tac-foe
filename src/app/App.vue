<script setup lang="ts">
import Board from '../board/components/Board.vue'
import GameOver from '../game/components/GameOver.vue'
import { useGameState } from '../game/business/useGameState'
import { useBot } from '../bot/useBot'
import BotComment from '../bot/components/BotComment.vue'

const { gameState, makeMove: makePlayerMove } = useGameState()
const { makeBotMove, comment } = useBot(gameState)

async function handleClickCell(i: number) {
	makePlayerMove(i)

	makeBotMove()
}
</script>

<template>
    <div class="app-root">
        <!-- Game Over -->
        <transition name="fade">
            <GameOver class="game-over" :winner="gameState.winner" />
        </transition>

        <!-- Board -->
        <Board class="board" :board=gameState.board @clicked-cell="handleClickCell" />

        <!-- Comment -->
        <BotComment v-if="comment" class="comment" :comment />
    </div>
</template>

<style scoped>
.app-root {
    width: 100vw;
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
    transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

</style>
