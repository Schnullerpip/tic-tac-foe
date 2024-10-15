import { ref, watch } from 'vue'
import { type GameState, makeMove } from '../game/model/GameState'
import { OpenAiBot } from './OpenAiBot'
import type { BotMood } from './bot'

export function useBot(gameState: GameState) {
	const bot = new OpenAiBot(import.meta.env.VITE_OPENAI_API_KEY)
	const comment = ref('')
	const mood = ref<BotMood>('neutral')

	watch(
		() => gameState.winner,
		async () => {
			if (gameState.winner) {
				const result = await bot.concludeGame(gameState)
				comment.value = result.comment
				mood.value = result.mood
			}
		},
	)

	return {
		makeBotMove,
		comment,
		mood,
	}

	async function makeBotMove() {
		if (gameState.winner) {
			return
		}
		const result = await bot.chooseNextMove(gameState)
		comment.value = result.comment
		makeMove(result.move, gameState)
		mood.value = result.mood
	}
}
