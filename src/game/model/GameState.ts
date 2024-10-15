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

if (import.meta.vitest) {
	const { describe, it, expect, beforeEach } = import.meta.vitest

	describe('GameState', () => {
		let gameState: GameState
		beforeEach(() => {
			gameState = defaultGameState()
		})

		it('should initialize the game state correctly', () => {
			expect(gameState.board).toHaveLength(9)
			expect(gameState.board.every((cell) => cell === undefined)).toBe(true)
			expect(gameState.turn).toBe('x')
			expect(gameState.winner).toBeUndefined()
		})

		it('should make a move and switch turns', () => {
			makeMove(0, gameState)
			expect(gameState.board[0]).toBe('x')
			expect(gameState.turn).toBe('o')
		})

		it('should not allow a move on an already occupied cell', () => {
			makeMove(0, gameState)
			makeMove(0, gameState)
			expect(gameState.board[0]).toBe('x')
			expect(gameState.turn).toBe('o')
		})

		it('should declare a winner if a win condition is met', () => {
			makeMove(0, gameState) // x
			makeMove(3, gameState) // o
			makeMove(1, gameState) // x
			makeMove(4, gameState) // o
			makeMove(2, gameState) // x
			expect(gameState.winner).toBe('x')
		})

		it('should be able to handle the star case', () => {
			makeMove(0, gameState) // x
			makeMove(1, gameState) // o
			makeMove(2, gameState) // x
			makeMove(5, gameState) // o
			makeMove(8, gameState) // x
			makeMove(7, gameState) // o
			makeMove(6, gameState) // x
			makeMove(3, gameState) // o
			makeMove(4, gameState) // x
			expect(gameState.winner).toBe('x')
		})

		it('should declare a draw if the board is full and no winner is found', () => {
			expect(gameState.winner).toBe(undefined)
			makeMove(0, gameState) // x
			makeMove(4, gameState) // o
			makeMove(8, gameState) // x

			makeMove(5, gameState) // o
			makeMove(3, gameState) // x
			makeMove(6, gameState) // o

			makeMove(2, gameState) // x
			makeMove(1, gameState) // o
			makeMove(7, gameState) // x
			expect(gameState.winner).toBe('draw')
		})
	})
}
