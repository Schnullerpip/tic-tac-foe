import { gameState } from '../game/business/useGameState'

export abstract class Bot {
	abstract chooseNextMove(): {
		comment: string
		nextMove: number
	}
}

export class RandomBot extends Bot {
	override chooseNextMove() {
		const availableMoves = gameState.board
			.map((cell, i) => (cell === undefined ? i : undefined))
			.filter((cell) => cell !== undefined)
		if (availableMoves.length === 0) {
			throw new Error('No available moves')
		}
		const randomIndex = Math.floor(Math.random() * availableMoves.length)
		return {
			comment: 'Random move',
			nextMove: availableMoves[randomIndex] as number,
		}
	}
}
