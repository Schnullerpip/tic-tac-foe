export async function GET(request: Request) {
	// TODO 11
	// 11.1 get your openai key from the right environment
	// 11.2. get the board parameter from the request
	// 11.2.1 decode the board
	// 11.3. create a new OpenAiBot with the openai key
	// 11.4. call chooseNextMove with the board
	// 11.5. return the result

	// TODO 13
	// 13.1 make the env variable to our hosted version via the vercel web interface
	return new Response(
		JSON.stringify({
			comment: 'Hello World',
			move: '1',
			mood: 'happy',
		}),
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	)
}
