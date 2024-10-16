import { decodeBoard } from '../shared/public/boardEncoder'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const board = searchParams.get('board')

	if (!board) {
		return new Response('Missing board parameter', { status: 400 })
	}

	console.debug(decodeBoard(board))

	return new Response(
		JSON.stringify({
			comment: 'todo',
			move: 0,
			mood: 'happy',
		}),
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	)
}
