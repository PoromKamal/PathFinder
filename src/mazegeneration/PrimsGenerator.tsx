
import { BoardEnum } from "../utils/BoardConfig";

interface Point {
  row: number;
  column: number;
}

export function generateMazePrims(rows: number, columns: number, startIdx: Point, endIdx: Point) {
  let grid: number[][] = Array(rows).fill(null).map(() => Array(columns).fill(BoardEnum.WALL));

  let toVisit: Point[] = [];
  toVisit.push(startIdx);

  let dx = [0, 1, 0, -1];
  let dy = [1, 0, -1, 0];

  while (toVisit.length > 0) {
    let randomIndex = Math.floor(Math.random() * toVisit.length);
    let point = toVisit[randomIndex];
    toVisit.splice(randomIndex, 1);

    let neighbors: Point[] = [];
    for (let i = 0; i < 4; i++) {
      let newRow = point.row + 2 * dx[i];
      let newColumn = point.column + 2 * dy[i];
      if (
        newRow >= 0 &&
        newRow < rows &&
        newColumn >= 0 &&
        newColumn < columns &&
        grid[newRow][newColumn] === BoardEnum.WALL &&
        !(newRow === startIdx.row && newColumn === startIdx.column) &&
        !(newRow === endIdx.row && newColumn === endIdx.column)
      ) {
        neighbors.push({ row: newRow, column: newColumn });
      }
    }

    if (neighbors.length > 0) {
      toVisit.push(point);
      let randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      grid[randomNeighbor.row][randomNeighbor.column] = BoardEnum.EMPTY;
      grid[point.row + (randomNeighbor.row - point.row) / 2][point.column + (randomNeighbor.column - point.column) / 2] = BoardEnum.EMPTY;
      toVisit.push(randomNeighbor);
    }
  }

  grid[startIdx.row][startIdx.column] = BoardEnum.START;
  grid[endIdx.row][endIdx.column] = BoardEnum.END;
  
  return grid;
}
