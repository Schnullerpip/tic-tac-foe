import type { GameState } from '../game/model/GameState'

export abstract class Bot {
	abstract chooseNextMove(gameState: GameState): Promise<{
		comment: string
		move: number
	}>

	abstract concludeGame(gameState: GameState): Promise<{
		comment: string
	}>
}

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
		}
	}

	async concludeGame(gameState: GameState): Promise<{
		comment: string
	}> {
		return {
			comment:
				gameState.winner === 'draw' || gameState.winner === 'x'
					? 'aww man'
					: 'Huzzaa',
		}
	}
}
