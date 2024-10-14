import { reactive } from 'vue'
import type { Cell } from '../model/Board'
import { type CellCoordinates, getCellCoordinates, getI } from '../../core/util'

export const gameState = reactive<{
	board: Cell[]
	turn: 'x' | 'o'
	winner: undefined | 'x' | 'o' | 'draw'
}>({
	board: Array(9).fill(undefined),
	turn: 'x',
	winner: undefined,
})

export function makeMove(i: number) {
	if (gameState.winner !== undefined || gameState.board[i] !== undefined) return
	gameState.board[i] = gameState.turn

	const xy = getCellCoordinates(i)
	const [x, y] = xy

	gameState.winner =
		checkWinCon([xy, [x + 1, y + 1], [x + 2, y + 2]]) ||
		checkWinCon([xy, [x + 1, y - 1], [x + 2, y - 2]]) ||
		checkWinCon([xy, [x - 1, y + 1], [x - 2, y + 2]]) ||
		checkWinCon([xy, [x - 1, y - 1], [x - 2, y - 2]]) ||
		checkWinCon([xy, [x, y + 1], [x, y + 2]]) ||
		checkWinCon([xy, [x, y - 1], [x, y - 2]]) ||
		checkWinCon([xy, [x + 1, y], [x + 2, y]]) ||
		checkWinCon([xy, [x - 1, y], [x - 2, y]])
			? gameState.turn
			: gameState.board.every((cell) => cell !== undefined)
				? 'draw'
				: undefined
	gameState.turn = gameState.turn === 'x' ? 'o' : 'x'
}

// --- module private

function checkWinCon(
	cells: [CellCoordinates, CellCoordinates, CellCoordinates],
): boolean {
	if (!cells.every(([x, y]) => x < 3 && x > -1 && y < 3 && y > -1)) return false
	const [state1, state2, state3] = cells.map(
		(cell) => gameState.board[getI(cell)],
	)
	return !!state1 && state1 === state2 && state2 === state3
}
