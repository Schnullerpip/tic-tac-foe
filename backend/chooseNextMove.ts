import { OpenAiBot } from '../shared/bot/OpenAiBot'
import { decodeBoard } from '../shared/public/boardEncoder'

export async function GET(request: Request) {
	const openaiKey = process.env.OPENAI_API_KEY
	if (!openaiKey) {
		throw new Error('Missing OPENAI_API_KEY')
	}
	const { searchParams } = new URL(request.url)
	const boardParam = searchParams.get('board')

	if (!boardParam) {
		return new Response('Missing board parameter', { status: 400 })
	}

	const board = decodeBoard(boardParam)
	const bot = new OpenAiBot(openaiKey)
	const result = await bot.chooseNextMove(board)

	return new Response(JSON.stringify(result), {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
