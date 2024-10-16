import type { Board } from '../../shared/model/Board'
import type { Winner } from '../../shared/model/Player'
import { encodeBoard } from '../../shared/public/boardEncoder'
import { HttpClient } from '../services/httpClient'
import {
	Bot,
	type ChooseNextMoveResult,
	type ConcludeGameResult,
} from '../../shared/bot/bot'

const baseUrl =
	import.meta.env.MODE === 'development'
		? 'http://localhost:3000'
		: 'https://tic-tac-foe-lime.vercel.app/'

export class ApiBot extends Bot {
	private readonly httpClient = new HttpClient(baseUrl)

	chooseNextMove(board: Board): Promise<ChooseNextMoveResult> {
		return this.httpClient.get('/api/chooseNextMove', {
			board: encodeBoard(board),
		})
	}

	concludeGame(winner: Winner): Promise<ConcludeGameResult> {
		return this.httpClient.get('/api/concludeGame', { winner })
	}
}
