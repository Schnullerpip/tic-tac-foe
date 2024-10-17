import { OpenAiBot } from '../shared/bot/OpenAiBot'

export async function GET(request: Request) {
	// TODO 12
	// 12.1 get your openai key from the right environment

	// 12.2 get the winner parameter from the request

	// 12.3 create a new OpenAiBot with the openai key

	// 12.4 call concludeGame with the winner

	// 12.5 return the result
	return new Response(
		JSON.stringify({
			comment: 'Hello World',
			mood: 'sad',
		}),
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	)
}
