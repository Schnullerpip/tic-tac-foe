export async function GET(request: Request) {
	return new Response(
		JSON.stringify({
			comment: 'concluded',
			mood: 'sad',
		}),
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	)
}
