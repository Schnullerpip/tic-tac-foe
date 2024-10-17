import { ref, watch } from 'vue'
import { type GameState, makeMove } from '../../../shared/model/GameState'
import type { Bot, BotMood } from '../../../shared/bot/bot'
import { OpenAiBot } from '../../../shared/bot/OpenAiBot'

// TODO 10
// 10.3 use the ApiBot class instead of the OpenAiBot class
export function useBot(gameState: GameState) {
	const bot: Bot = new OpenAiBot(import.meta.env.VITE_OPENAI_API_KEY)
	const comment = ref('')
	const mood = ref<BotMood>('neutral')

	watch(
		() => gameState.winner,
		async () => {
			if (gameState.winner) {
				const result = await bot.concludeGame(gameState.winner)
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
		const result = await bot.chooseNextMove(gameState.board)
		comment.value = result.comment
		makeMove(result.move, gameState)
		mood.value = result.mood
	}
}
