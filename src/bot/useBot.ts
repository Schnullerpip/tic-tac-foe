import { ref } from 'vue'
import { makeMove, type GameState } from '../game/model/GameState'
import { RandomBot } from './bot'

export function useBot(gameState: GameState) {
	const bot = new RandomBot()
	const comment = ref('')

	return {
		makeBotMove,
		comment,
	}

	async function makeBotMove() {
		const result = await bot.chooseNextMove(gameState)
		comment.value = result.comment
		makeMove(result.nextMove, gameState)
	}
}
