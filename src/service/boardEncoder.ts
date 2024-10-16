import type { Board } from '../game/model/Board'

export function encodeBoard(board: Board): string {
	const mappedCells = board.map((cell) => cell ?? 'u')
	const [a1, a2, a3, b1, b2, b3, c1, c2, c3] = mappedCells
	return `${a1}|${a2}|${a3}
        ${b1}|${b2}|${b3}
        ${c1}|${c2}|${c3}`
}

export function decodeBoard(encodedBoard: string): Board {
	const rows = encodedBoard.split('\n')
	const parsedCells = rows.flatMap((row) => row.split('|'))
	return parsedCells.map((cell) => (cell === 'u' ? undefined : cell)) as Board
}
