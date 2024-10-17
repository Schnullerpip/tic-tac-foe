import type { Board } from '../model/Board'
import type { Winner } from '../model/Player'
import { OpenAiClient } from '../services/openai/OpenAiClient'
import { Bot, type BotMood } from './bot'

// TODO 6
// 6.1. implement the getPersonalityPrompt method in order to set the general personality of the bot, affecting the other prompts
// 6.2. implement the getConcedePrompt method prompts
// 6.3. implement the getMovePrompt method prompts (tip 1. this prompt should be really elaborate) (tip 2. find a way for the bot to understant the board state the encodeBoard functions could help) (tip 3. few-shot prompting is a very effective technique to use here)
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
		return 'wow. much personality. so person'
	}

	private getConcedePrompt(winner: Winner): string {
		const state = winner === 'draw' ? 'todo' : winner === 'x' ? 'todo' : 'todo'
		return `${this.getPersonalityPrompt()}${state}Explain the result of the game in 2 to 3 sentences in a concise manner.`
	}

	private getMovePrompt(board: Board): string {
		return `${this.getPersonalityPrompt()}todo`
	}
}
