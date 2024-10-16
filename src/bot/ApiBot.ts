import type { Board } from '../../shared/model/Board'
import type { Winner } from '../../shared/model/Player'
import { encodeBoard } from '../../shared/public/boardEncoder'
import { HttpClient } from '../services/httpClient'
import {
	Bot,
	type ChooseNextMoveResult,
	type ConcludeGameResult,
} from '../../shared/bot/bot'

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
