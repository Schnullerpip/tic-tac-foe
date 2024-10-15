import { reactive } from 'vue'
import type { Cell } from '../model/Board'
import {
	type CellCoordinates,
	type Direction,
	directions,
	getCellCoordinates,
	getCellCoordinatesInDirection,
	getI,
} from '../model/Board'

const defaultGameState = () =>
	({
		board: [
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
		],
		turn: 'x',
		winner: undefined,
	}) as const satisfies GameState

export const gameState = reactive<GameState>(defaultGameState())

export function makeMove(i: number) {
	if (gameState.winner !== undefined || gameState.board[i] !== undefined) return
	gameState.board[i] = gameState.turn

	const xy = getCellCoordinates(i)

	gameState.winner = directions.some((dir) => {
		const inverseDir = dir.map((d) => -d) as Direction
		const startXY = getCellCoordinatesInDirection(xy, inverseDir) ?? xy
		return checkWinConInDirection(startXY, dir, gameState.turn)
	})
		? gameState.turn
		: gameState.board.every((cell) => cell !== undefined)
			? 'draw'
			: undefined
	gameState.turn = gameState.turn === 'x' ? 'o' : 'x'
}

// --- module private

type GameState = {
	board: [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell]
	turn: 'x' | 'o'
	winner: undefined | 'x' | 'o' | 'draw'
}

function checkWinConInDirection(
	xy: CellCoordinates,
	direction: Direction,
	requiredState: Exclude<Cell, undefined>,
	depth = 0,
): boolean {
	if (depth > 2 || gameState.board[getI(xy)] !== requiredState) return false
	if (depth === 2) return true

	const nextXY = getCellCoordinatesInDirection(xy, direction)
	if (!nextXY) return false

	return checkWinConInDirection(nextXY, direction, requiredState, depth + 1)
}

// --- tests

if (import.meta.vitest) {
	const { describe, it, expect, beforeEach } = import.meta.vitest

	describe('GameState', () => {
		beforeEach(() => {
			const state = defaultGameState()
			gameState.board = state.board
			gameState.turn = state.turn
			gameState.winner = state.winner
		})

		it('should initialize the game state correctly', () => {
			expect(gameState.board).toHaveLength(9)
			expect(gameState.board.every((cell) => cell === undefined)).toBe(true)
			expect(gameState.turn).toBe('x')
			expect(gameState.winner).toBeUndefined()
		})

		it('should make a move and switch turns', () => {
			makeMove(0)
			expect(gameState.board[0]).toBe('x')
			expect(gameState.turn).toBe('o')
		})

		it('should not allow a move on an already occupied cell', () => {
			makeMove(0)
			makeMove(0)
			expect(gameState.board[0]).toBe('x')
			expect(gameState.turn).toBe('o')
		})

		it('should declare a winner if a win condition is met', () => {
			makeMove(0) // x
			makeMove(3) // o
			makeMove(1) // x
			makeMove(4) // o
			makeMove(2) // x
			expect(gameState.winner).toBe('x')
		})

		it('should be able to handle the star case', () => {
			makeMove(0) // x
			makeMove(1) // o
			makeMove(2) // x
			makeMove(5) // o
			makeMove(8) // x
			makeMove(7) // o
			makeMove(6) // x
			makeMove(3) // o
			makeMove(4) // x
			expect(gameState.winner).toBe('x')
		})

		it('should declare a draw if the board is full and no winner is found', () => {
			expect(gameState.winner).toBe(undefined)
			makeMove(0) // x
			makeMove(4) // o
			makeMove(8) // x

			makeMove(5) // o
			makeMove(3) // x
			makeMove(6) // o

			makeMove(2) // x
			makeMove(1) // o
			makeMove(7) // x
			expect(gameState.winner).toBe('draw')
		})
	})
}
