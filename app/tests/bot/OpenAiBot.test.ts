import { beforeEach, describe, expect, it } from 'vitest'
import { OpenAiBot } from '../../../shared/bot/OpenAiBot'
import type { GameState } from '../../../shared/model/GameState'

describe('OpenAiBot', () => {
	let bot: OpenAiBot
	beforeEach(() => {
		bot = new OpenAiBot(import.meta.env.VITE_OPENAI_API_KEY)
	})

	it.skip(
		'should give a comment and a move',
		async () => {
			const gameState: GameState = {
				board: [
					'x',
					undefined,
					undefined,
					undefined,
					undefined,
					undefined,
					undefined,
					undefined,
					undefined,
				],
				turn: 'o',
				winner: undefined,
			}
			const completion = await bot.chooseNextMove(gameState.board)
			expect('comment' in completion).toBe(true)
			expect('move' in completion).toBe(true)
			expect(typeof completion.comment === 'string').toBe(true)
			expect(typeof completion.move === 'number').toBe(true)
		},
		{ timeout: 10000 },
	)

	it.skip('should make the winning move', async () => {
		const gameState: GameState = {
			board: [
				'x',
				'x',
				undefined,
				'o',
				'o',
				undefined,
				'x',
				undefined,
				undefined,
			],
			turn: 'o',
			winner: undefined,
		}
		const completion = await bot.chooseNextMove(gameState.board)
		expect(completion.move).toBe(5)
	})
})
