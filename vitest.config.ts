import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [vue()],
	test: {
		globals: true,
		environment: 'jsdom',
		include: [
			'src/**/*.test.ts',
			'src/game/model/GameState.ts',
			'src/service/openai/OpenAiClient.ts',
			'src/bot/OpenAiBot.ts',
		],
	},
})
