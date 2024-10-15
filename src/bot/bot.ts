import type { Board } from '../game/model/Board'
import type { Winner } from '../game/model/Player'

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
	abstract chooseNextMove(board: Board): Promise<ChooseNextMoveResult>
	abstract concludeGame(winner: Winner): Promise<ConcludeGameResult>
}
