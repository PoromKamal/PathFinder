// KruskalMazeGenerator.ts
import { BoardEnum } from "../utils/BoardConfig";

interface Point {
  row: number;
  column: number;
}

interface Cell {
  rank: number;
  parent: number;
}

function find(cell: number, parents: Cell[]): number {
  if (parents[cell].parent !== cell) {
    parents[cell].parent = find(parents[cell].parent, parents);
  }
  return parents[cell].parent;
}

function union(cell1: number, cell2: number, parents: Cell[]): void {
  let root1 = find(cell1, parents);
  let root2 = find(cell2, parents);
  
  if (root1 !== root2) {
    if (parents[root1].rank < parents[root2].rank) {
      parents[root1].parent = root2;
    } else if (parents[root1].rank > parents[root2].rank) {
      parents[root2].parent = root1;
    } else {
      parents[root2].parent = root1;
      parents[root1].rank++;
    }
  }
}

export function generateMazeKruskal(rows: number, columns: number, startIdx: Point, endIdx: Point): number[][] {
  let grid: number[][] = Array(rows).fill(null).map(() => Array(columns).fill(BoardEnum.WALL));

  let parents: Cell[] = Array(rows * columns).fill(0).map(() => ({ rank: 0, parent: 0 }));
  let walls: Point[] = [];

  for (let i = 0; i < rows * columns; i++) {
    parents[i].parent = i;
  }

  for (let i = 0; i < rows; i += 2) {
    for (let j = 0; j < columns; j += 2) {
      grid[i][j] = BoardEnum.EMPTY;
      if (i < rows - 2) walls.push({ row: i + 1, column: j });
      if (j < columns - 2) walls.push({ row: i, column: j + 1 });
    }
  }

  while (walls.length > 0) {
    let randomIndex = Math.floor(Math.random() * walls.length);
    let wall = walls[randomIndex];
    walls.splice(randomIndex, 1);
    
    let neighbor1, neighbor2;
    if (wall.row % 2 === 0) {
      neighbor1 = { row: wall.row, column: wall.column - 1 };
      neighbor2 = { row: wall.row, column: wall.column + 1 };
    } else {
      neighbor1 = { row: wall.row - 1, column: wall.column };
      neighbor2 = { row: wall.row + 1, column: wall.column };
    }
    
    let cell1 = neighbor1.row * columns + neighbor1.column;
    let cell2 = neighbor2.row * columns + neighbor2.column;
    
    if (find(cell1, parents) !== find(cell2, parents)) {
      union(cell1, cell2, parents);
      grid[wall.row][wall.column] = BoardEnum.EMPTY;
    }
  }

  grid[startIdx.row][startIdx.column] = BoardEnum.START;
  grid[endIdx.row][endIdx.column] = BoardEnum.END;
  
  return grid;
}
