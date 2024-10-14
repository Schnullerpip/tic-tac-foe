<script setup lang="ts">
import Board from '../game/components/Board.vue'
import GameOver from '../game/components/GameOver.vue'
</script>

<template>
    <div class="app-root">
        <!-- Game Over -->
        <transition name="fade">
            <GameOver class="game-over"/>
        </transition>

        <!-- Board -->
        <Board />
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

</style>
