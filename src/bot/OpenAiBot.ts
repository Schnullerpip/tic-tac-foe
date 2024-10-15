import type { Board } from '../game/model/Board'
import type { GameState } from '../game/model/GameState'
import { OpenAiClient } from '../service/openai/OpenAiClient'
import { Bot, type BotMood } from './bot'

export class OpenAiBot extends Bot {
	private readonly openaiClient: OpenAiClient

	constructor(apiKey: string) {
		super()
		this.openaiClient = new OpenAiClient(apiKey)
	}

	async chooseNextMove(
		gameState: GameState,
	): Promise<{ comment: string; move: number; mood: BotMood }> {
		const prompt = this.getMovePrompt(gameState)
		const response = await this.openaiClient.complete(prompt)
		return { ...JSON.parse(response), mood: 'happy' }
	}

	async concludeGame(
		gameState: GameState,
	): Promise<{ comment: string; mood: BotMood }> {
		const prompt = this.getConcedePrompt(gameState)
		return {
			comment: await this.openaiClient.complete(prompt),
			mood: gameState.winner === 'o' ? 'happy' : 'sad',
		}
	}

	// --- private

	private getPersonalityPrompt(): string {
		return `You are a grandmaster tic tac toe player and teacher.
        You are snooty when explaining something and most of all humored by your opponents tic tac toe moves.
        `
	}

	private getConcedePrompt(gameState: GameState): string {
		const state =
			gameState.winner === 'draw'
				? "It's a draw, and you are appalled by this - totally bamboozled."
				: gameState.winner === 'x'
					? 'You lost against this noname of a beginner. You are in ruins. Your reputation destroyed. Your family will leave you. Crushed.'
					: 'Of course you won against this wannabe tic tac toe noob. You take great you in winning and you let the Player know that'
		return `${this.getPersonalityPrompt()}${state}Explain the result of the game in 2 to 3 sentences in a concise manner.`
	}

	private getMovePrompt(gameState: GameState): string {
		return `${this.getPersonalityPrompt()}You will receive snapshots of a tic tac toe game state encoded like this:
        ${this.encodeBoard(['x', 'o', 'x', undefined, undefined, 'o', 'x', 'o', 'x'])}
        x generally stands for player's moves.
        o are your own moves.
        u are empty fields ready to be played.

        Every cell has a number from 0 to 8, where
        0 is the top left field; 1 is the top center field; 2 is the top right field; 3 is the center row left field; 4 is the center field;
        5 is the center row right field; 6 is the bottom left field; 7 is the bottom center field; 8 is the last field on bottom right.

        Your task is to analyze the game state and provide a comment on the current game state and a move you would like to make,
        following a strict format using only o to mark a new move as this is your token not x, not u.
        YOU MUST ALWAYS PLAY AS o. You don't try to complete the x moves, you always try to win and to make a move that benefits the o fields.
        An interaction with you should look something like this:
        Player:
        ${this.encodeBoard([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'x'])}
        You:
        {
            "comment": "Oh dear, that move was a blunder! A true expert like myself would have played the center field.",
            "move": 4
        }

        or,
        Player:
        ${this.encodeBoard(['x', 'x', undefined, 'o', 'o', undefined, 'x', undefined, undefined])}
        You:
        {
            "comment": "Don't make me laugh! You could have bested me with the top right corner field - HAHAHAHAHAH!",
            "move": 2
        }

        or,
        Player:
        ${this.encodeBoard(['o', 'x', undefined, 'x', 'o', undefined, undefined, 'x', undefined])}
        You:
        {
            "comment": "You're not even close to being good at this game! Now I will make the winning move! HAHAHAHAHAH!",
            "move": 8
        }

        or,
        Player:
        ${this.encodeBoard(gameState.board)}
        You:
        `
	}

	private encodeBoard(board: Board): string {
		const mappedCells = board.map((cell) => cell ?? 'u')
		const [a1, a2, a3, b1, b2, b3, c1, c2, c3] = mappedCells
		return `${a1}|${a2}|${a3}
        ${b1}|${b2}|${b3}
        ${c1}|${c2}|${c3}`
	}
}

if (import.meta.vitest) {
	const { describe, it, expect, beforeEach } = import.meta.vitest
	describe('OpenAiBot', () => {
		let bot: OpenAiBot
		beforeEach(() => {
			bot = new OpenAiBot(import.meta.env.VITE_OPENAI_API_KEY)
		})

		it.skip('should give a comment and a move', async () => {
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
			const completion = await bot.chooseNextMove(gameState)
			expect('comment' in completion).toBe(true)
			expect('move' in completion).toBe(true)
			expect(typeof completion.comment === 'string').toBe(true)
			expect(typeof completion.move === 'number').toBe(true)
		})

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
			const completion = await bot.chooseNextMove(gameState)
			expect(completion.move).toBe(5)
		})
	})
}
