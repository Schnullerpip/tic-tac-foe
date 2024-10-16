import { reactive } from 'vue'
import {
	defaultGameState,
	makeMove as makeMoveOnGameState,
	type GameState,
} from '../../../shared/model/GameState'

export function useGameState() {
	const gameState = reactive<GameState>(defaultGameState())

	return {
		gameState,
		makeMove,
	}

	function makeMove(i: number) {
		makeMoveOnGameState(i, gameState)
	}
}
