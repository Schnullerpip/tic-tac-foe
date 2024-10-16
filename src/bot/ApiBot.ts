import type { Board } from '../game/model/Board'
import type { Winner } from '../game/model/Player'
import { encodeBoard } from '../service/boardEncoder'
import { HttpClient } from '../service/httpClient'
import { Bot, type ChooseNextMoveResult, type ConcludeGameResult } from './bot'

export class ApiBot extends Bot {
	private readonly httpClient = new HttpClient('http://localhost:3000') //todo

	chooseNextMove(board: Board): Promise<ChooseNextMoveResult> {
		return this.httpClient.get('/api/chooseNextMove', {
			board: encodeBoard(board),
		})
	}

	concludeGame(winner: Winner): Promise<ConcludeGameResult> {
		return this.httpClient.get('/api/concludeGame', { winner })
	}
}
