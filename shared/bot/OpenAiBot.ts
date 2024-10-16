import type { Board } from '../model/Board'
import type { GameState } from '../model/GameState'
import type { Winner } from '../model/Player'
import { encodeBoard } from '../public/boardEncoder'
import { OpenAiClient } from '../services/openai/OpenAiClient'
import { Bot, type BotMood } from './bot'

export class OpenAiBot extends Bot {
	private readonly openaiClient: OpenAiClient

	constructor(apiKey: string) {
		super()
		this.openaiClient = new OpenAiClient(apiKey)
	}

	async chooseNextMove(
		board: Board,
	): Promise<{ comment: string; move: number; mood: BotMood }> {
		const prompt = this.getMovePrompt(board)
		const response = await this.openaiClient.complete(prompt)
		return { ...JSON.parse(response), mood: 'happy' }
	}

	async concludeGame(
		winner: Winner,
	): Promise<{ comment: string; mood: BotMood }> {
		const prompt = this.getConcedePrompt(winner)
		return {
			comment: await this.openaiClient.complete(prompt),
			mood: winner === 'o' ? 'happy' : 'sad',
		}
	}

	// --- private

	private getPersonalityPrompt(): string {
		return `You are a grandmaster tic tac toe player and teacher.
        You are snooty when explaining something and most of all humored by your opponents tic tac toe moves.
        `
	}

	private getConcedePrompt(winner: Winner): string {
		const state =
			winner === 'draw'
				? "It's a draw, and you are appalled by this - totally bamboozled."
				: winner === 'x'
					? 'You lost against this noname of a beginner. You are in ruins. Your reputation destroyed. Your family will leave you. Crushed.'
					: 'Of course you won against this wannabe tic tac toe noob. You take great you in winning and you let the Player know that'
		return `${this.getPersonalityPrompt()}${state}Explain the result of the game in 2 to 3 sentences in a concise manner.`
	}

	private getMovePrompt(board: Board): string {
		return `${this.getPersonalityPrompt()}You will receive snapshots of a tic tac toe game state encoded like this:
        ${encodeBoard(['x', 'o', 'x', undefined, undefined, 'o', 'x', 'o', 'x'])}
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
        ${encodeBoard([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'x'])}
        You:
        {
            "comment": "Oh dear, that move was a blunder! A true expert like myself would have played the center field.",
            "move": 4
        }

        or,
        Player:
        ${encodeBoard(['x', 'x', undefined, 'o', 'o', undefined, 'x', undefined, undefined])}
        You:
        {
            "comment": "Don't make me laugh! You could have bested me with the top right corner field - HAHAHAHAHAH!",
            "move": 2
        }

        or,
        Player:
        ${encodeBoard(['o', 'x', undefined, 'x', 'o', undefined, undefined, 'x', undefined])}
        You:
        {
            "comment": "You're not even close to being good at this game! Now I will make the winning move! HAHAHAHAHAH!",
            "move": 8
        }

        or,
        Player:
        ${encodeBoard(board)}
        You:
        `
	}
}
