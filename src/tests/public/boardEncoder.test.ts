import { describe, it, expect } from 'vitest'
import { encodeBoard, decodeBoard } from '../../../shared/public/boardEncoder'
import type { Board } from '../../../shared/model/Board'

describe('boardEncoder', () => {
	describe('encodeBoard', () => {
		it('should encode an empty board correctly', () => {
			const emptyBoard: Board = [
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
			]
			const encoded = encodeBoard(emptyBoard)
			expect(encoded).toBe('u|u|u\nu|u|u\nu|u|u')
		})

		it('should encode a board with moves correctly', () => {
			const board: Board = [
				'x',
				undefined,
				'o',
				undefined,
				'x',
				undefined,
				'o',
				undefined,
				'x',
			]
			const encoded = encodeBoard(board)
			expect(encoded).toBe('x|u|o\nu|x|u\no|u|x')
		})
	})

	describe('decodeBoard', () => {
		it('should decode an encoded empty board correctly', () => {
			const encodedBoard = 'u|u|u\nu|u|u\nu|u|u'
			const decoded = decodeBoard(encodedBoard)
			expect(decoded).toEqual([
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
			])
		})

		it('should decode an encoded board with moves correctly', () => {
			const encodedBoard = 'x|u|o\nu|x|u\no|u|x'
			const decoded = decodeBoard(encodedBoard)
			expect(decoded).toEqual([
				'x',
				undefined,
				'o',
				undefined,
				'x',
				undefined,
				'o',
				undefined,
				'x',
			])
		})
	})
})
