<template>
  <div class="cell" :class="{ unclickable: state !== undefined }">
    {{ state }}
  </div>
</template>

<script setup lang="ts">
import type { Cell } from '../model/Board'

defineProps<{
	state: Cell
}>()
</script>

<style scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 3em;
  font-weight: 700;

  width: 80px;
  height: 80px;

  border-radius: 10px;
  border: 1px solid black;

  text-transform: uppercase;
  text-align: center;

  background: white;
  color: black;

  transition: opacity 0.1s, transform 0.1s;

  &:not(.unclickable):active {
    opacity: 0.8;
    transform: scale(0.95);
  }

  &.unclickable {
    pointer-events: none;
  }
}
</style>
