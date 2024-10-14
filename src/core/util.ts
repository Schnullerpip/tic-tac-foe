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
