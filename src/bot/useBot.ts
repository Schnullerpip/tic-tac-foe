import { ref, watch } from 'vue'
import { makeMove, type GameState } from '../game/model/GameState'
import { OpenAiBot } from './OpenAiBot'
import { OpenAiClient } from '../service/openai/OpenAiClient'

export function useBot(gameState: GameState) {
	const bot = new OpenAiBot(new OpenAiClient())
	const comment = ref('')

	watch(
		() => gameState.winner,
		async () => {
			if (gameState.winner) {
				const result = await bot.concludeGame(gameState)
				comment.value = result.comment
			}
		},
	)

	return {
		makeBotMove,
		comment,
	}

	async function makeBotMove() {
		if (gameState.winner) {
			return
		}
		const result = await bot.chooseNextMove(gameState)
		comment.value = result.comment
		makeMove(result.move, gameState)
	}
}
