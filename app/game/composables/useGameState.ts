import {
	defaultGameState,
	makeMove as makeMoveOnGameState,
} from '../../../shared/model/GameState'

// TODO 1
// make the game state reactive using vue

export function useGameState() {
	const gameState = defaultGameState()

	return {
		gameState,
		makeMove,
	}

	function makeMove(i: number) {
		makeMoveOnGameState(i, gameState)
	}
}
