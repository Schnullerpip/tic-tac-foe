import type { Player } from './Player'

export type Cell = undefined | Player

export type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell]

export const defaultBoard = () =>
	[
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
	] as const satisfies Board

export type CellCoordinates = [
	number, // x
	number, // y
]

export function getCellCoordinates(i: number): CellCoordinates {
	return [i % 3, Math.floor(i / 3)]
}

export function getI(cell: CellCoordinates): number {
	return cell[1] * 3 + cell[0]
}

export type Direction = [1 | -1 | 0, 1 | -1 | 0]
export const directions: Direction[] = [
	[-1, -1],
	[1, -1],
	[-1, 1],
	[1, 1],
	[1, 0],
	[-1, 0],
	[0, -1],
	[0, 1],
]

export function getCellCoordinatesInDirection(
	xy: CellCoordinates,
	direction: Direction,
): CellCoordinates | undefined {
	const [dx, dy] = direction
	const [x, y] = xy

	const x1 = x + dx
	const y1 = y + dy

	if (x1 < 0 || x1 > 2 || y1 < 0 || y1 > 2) {
		return undefined
	}

	return [x1, y1]
}
