import type { GameState } from '../game/model/GameState'

export type BotMood = 'neutral' | 'happy' | 'sad'
export type ChooseNextMoveResult = {
	comment: string
	move: number
	mood: BotMood
}
export type ConcludeGameResult = {
	comment: string
	mood: BotMood
}

export abstract class Bot {
	abstract chooseNextMove(gameState: GameState): Promise<ChooseNextMoveResult>
	abstract concludeGame(gameState: GameState): Promise<ConcludeGameResult>
}
