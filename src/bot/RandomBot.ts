import type { GameState } from '../game/model/GameState'
import { Bot, type BotMood, type ConcludeGameResult } from './bot'

export class RandomBot extends Bot {
	override async chooseNextMove(gameState: GameState) {
		const availableMoves = gameState.board
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

	async concludeGame(gameState: GameState): Promise<ConcludeGameResult> {
		return {
			comment:
				gameState.winner === 'draw' || gameState.winner === 'x'
					? 'aww man'
					: 'Huzzaa',
			mood: 'neutral',
		}
	}
}
