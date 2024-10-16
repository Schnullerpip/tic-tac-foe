import type { Board } from '../model/Board'
import type { Winner } from '../model/Player'

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
