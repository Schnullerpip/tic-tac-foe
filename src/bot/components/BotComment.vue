<template>
    <div class="bot-comment">
        {{ comment }}
        <img :src width="100" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import neutral from '../../assets/nigel.webp'
import sad from '../../assets/nigel-crying.png'
import happy from '../../assets/nigel-laughing.webp'

const props = defineProps<{
	comment: string
	mood: 'neutral' | 'happy' | 'sad'
}>()

const src = computed(() => {
	switch (props.mood) {
		case 'neutral':
			return neutral
		case 'happy':
			return happy
		case 'sad':
			return sad
	}
})
</script>

<style scoped>
.bot-comment {
    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    font-size: 1.5rem;
    text-align: center;
    font-style: italic;
}
</style>
