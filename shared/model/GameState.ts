import {
	defaultBoard,
	type Direction,
	directions,
	type Cell,
	getCellCoordinatesInDirection,
	getCellCoordinates,
	type CellCoordinates,
	getI,
	type Board,
} from './Board'
import type { Player } from './Player'

export type GameState = {
	board: Board
	turn: Player
	winner: undefined | Player | 'draw'
}

/** Makes a move on a gameState
 * - placing a player's move on the board
 * - determining the game's winner
 */
export function makeMove(i: number, gameState: GameState) {
	if (gameState.winner !== undefined || gameState.board[i] !== undefined) return
	gameState.board[i] = gameState.turn

	const xy = getCellCoordinates(i)

	gameState.winner = directions.some((dir) => {
		const inverseDir = dir.map((d) => -d) as Direction
		const startXY = getCellCoordinatesInDirection(xy, inverseDir) ?? xy
		return checkWinConInDirection(gameState, startXY, dir, gameState.turn)
	})
		? gameState.turn
		: gameState.board.every((cell) => cell !== undefined)
			? 'draw'
			: undefined
	gameState.turn = gameState.turn === 'x' ? 'o' : 'x'
}

/** Creates a fresh game state */
export function defaultGameState(): GameState {
	return {
		board: defaultBoard(),
		turn: 'x',
		winner: undefined,
	}
}

// --- module private

function checkWinConInDirection(
	gameState: GameState,
	xy: CellCoordinates,
	direction: Direction,
	requiredState: Exclude<Cell, undefined>,
	depth = 0,
): boolean {
	if (depth > 2 || gameState.board[getI(xy)] !== requiredState) return false
	if (depth === 2) return true

	const nextXY = getCellCoordinatesInDirection(xy, direction)
	if (!nextXY) return false

	return checkWinConInDirection(
		gameState,
		nextXY,
		direction,
		requiredState,
		depth + 1,
	)
}
