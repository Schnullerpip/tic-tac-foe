import { ref, watch } from 'vue'
import type { Bot, BotMood } from '../../../shared/bot/bot'
import { type GameState, makeMove } from '../../../shared/model/GameState'
import { RandomBot } from '../RandomBot'

// TODO 7
// 7.1. retrieve the openai api key from the right environment
// 7.2. use the OpenAiBot class to create a (hopefully) smarter bot instead of the RandomBot

// TODO 10
// 10.3 use the ApiBot class instead of the OpenAiBot class
export function useBot(gameState: GameState) {
	const bot: Bot = new RandomBot()
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
