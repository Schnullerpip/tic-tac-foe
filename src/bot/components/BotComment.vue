<template>
    <div class="bot-comment">
        "{{ comment }}"
    </div>
</template>

<script setup lang="ts">
defineProps<{
	comment: string
}>()
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
