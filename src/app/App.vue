<script setup lang="ts">
import Board from '../board/components/Board.vue'
import GameOver from '../game/components/GameOver.vue'
import { useGameState } from '../game/business/useGameState'
import { useBot } from '../bot/useBot'
import { useSleep } from '../core/useSleep'
import BotComment from '../bot/components/BotComment.vue'

const { gameState, makeMove: makePlayerMove } = useGameState()
const { makeBotMove, comment } = useBot(gameState)
const { sleep } = useSleep()

async function handleClickCell(i: number) {
	makePlayerMove(i)
	await sleep(1000)
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
        <Board :board=gameState.board @clicked-cell="handleClickCell" />

        <!-- Comment -->
        <BotComment v-if="comment" class="comment" :comment />
    </div>
</template>

<style scoped>
.app-root {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.game-over {
    position: absolute;
    top: 10vh;
    left: 0;
    right: 0;
    height: 100px;
}

.comment {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

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
