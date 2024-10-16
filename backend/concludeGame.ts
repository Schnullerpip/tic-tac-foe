import { OpenAiBot } from '../shared/bot/OpenAiBot'

export async function GET(request: Request) {
	const openaiKey = process.env.OPENAI_API_KEY
	if (!openaiKey) {
		throw new Error('Missing OPENAI_API_KEY')
	}

	const { searchParams } = new URL(request.url)
	const winnerParam = searchParams.get('winner')

	if (!winnerParam) {
		return new Response('Missing winner parameter', { status: 400 })
	}
	if (winnerParam !== 'x' && winnerParam !== 'o' && winnerParam !== 'draw') {
		return new Response('Bad parameter winner', { status: 400 })
	}

	const winner = winnerParam as 'x' | 'o' | 'draw'

	const bot = new OpenAiBot(openaiKey)
	const result = await bot.concludeGame(winner)

	return new Response(JSON.stringify(result), {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
