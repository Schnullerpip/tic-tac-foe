import type { Board } from '../game/model/Board'
import type { Winner } from '../game/model/Player'
import { Bot, type BotMood, type ConcludeGameResult } from './bot'

export class RandomBot extends Bot {
	override async chooseNextMove(board: Board) {
		const availableMoves = board
			.map((cell, i) => (cell === undefined ? i : undefined))
			.filter((cell) => cell !== undefined)
		if (availableMoves.length === 0) {
			throw new Error('No available moves')
		}
		const randomIndex = Math.floor(Math.random() * availableMoves.length)
		return {
			comment: 'Random move',
			move: availableMoves[randomIndex] as number,
			mood: 'happy' as BotMood,
		}
	}

	async concludeGame(winner: Winner): Promise<ConcludeGameResult> {
		return {
			comment: winner === 'draw' || winner === 'x' ? 'aww man' : 'Huzzaa',
			mood: 'neutral',
		}
	}
}
