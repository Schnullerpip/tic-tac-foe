import { beforeEach, describe, expect, it } from 'vitest'
import {
	defaultGameState,
	type GameState,
	makeMove,
} from '../../../shared/model/GameState'

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
