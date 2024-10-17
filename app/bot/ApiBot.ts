import type { Board } from '../../shared/model/Board'
import type { Winner } from '../../shared/model/Player'
import { encodeBoard } from '../../shared/public/boardEncoder'
import { HttpClient } from '../services/httpClient'
import {
	Bot,
	type ChooseNextMoveResult,
	type ConcludeGameResult,
} from '../../shared/bot/bot'

// TODO 10
// 10.1 when you have a running vercel dev server, put its url here
// 10.2 when you have a domain use it here when MODE is not development
const baseUrl =
	import.meta.env.MODE === 'development'
		? 'well, this string is definitely not a valid url to our locally hosted vercel dev server...'
		: 'well, this string is definitely not a valid domain in the web...'

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
