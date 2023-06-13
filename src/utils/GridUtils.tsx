export type Point = { row: number, column: number };
export type ParentMap = { [key: string]: Point | null };

export const directions = [
    { row: -1, column: 0 }, // up
    { row: 1, column: 0 }, // down
    { row: 0, column: -1 }, // left
    { row: 0, column: 1 } // right
];

export function pointToString(point: Point): string {
  return `${point.row},${point.column}`;
}

export function isValid(newRow: number, newColumn: number, rows: number, columns: number, 
                        visited: boolean[][], grid: Number[][], BoardEnum: any): boolean {
  return (
    newRow >= 0 &&
    newRow < rows &&
    newColumn >= 0 &&
    newColumn < columns &&
    !visited[newRow][newColumn] &&
    grid[newRow][newColumn] !== BoardEnum.WALL
  );
}