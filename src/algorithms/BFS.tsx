import { BoardEnum } from "@/utils/BoardConfig";

type Point = { row: number, column: number };
type ParentMap = { [key: string]: Point | null };

const directions = [
    { row: -1, column: 0 }, // up
    { row: 1, column: 0 }, // down
    { row: 0, column: -1 }, // left
    { row: 0, column: 1 } // right
];

function pointToString(point: Point): string {
    return `${point.row},${point.column}`;
}

// Helper function for checking point validity
function isValid(newRow: number, newColumn: number, rows: number, columns: number, visited: boolean[][], grid: Number[][], BoardEnum: any): boolean {
    return (
      newRow >= 0 &&
      newRow < rows &&
      newColumn >= 0 &&
      newColumn < columns &&
      !visited[newRow][newColumn] &&
      grid[newRow][newColumn] !== BoardEnum.WALL
    );
  }

function bfsExploreDirections(
    currentPoint: Point,
    rows: number,
    columns: number,
    visited: boolean[][],
    grid: Number[][],
    queue: Point[],
    parents: ParentMap,
  ) {
    directions.forEach(({row, column}) => {
      const newRow = currentPoint.row + row;
      const newColumn = currentPoint.column + column;
  
      if (isValid(newRow, newColumn, rows, columns, visited, grid, BoardEnum)) {
        const newPoint: Point = { row: newRow, column: newColumn };
        queue.push(newPoint);
        visited[newRow][newColumn] = true;
        parents[pointToString(newPoint)] = currentPoint;
      }
    });
  }

export function bfs(grid: Number[][], start: Point, end: Point) {
    const rows = grid.length;
    const columns = grid[0].length;
    
    let queue: Point[] = [];
    let visited: boolean[][] = Array(rows).fill(false).map(() => Array(columns).fill(false));
    let parents: ParentMap = {};

    queue.push(start);
    visited[start.row][start.column] = true;

    while (queue.length !== 0) {
        const currentPoint = queue.shift()!;
        
        if (currentPoint.row === end.row && currentPoint.column === end.column) {
            // found the destination
            let pathCoordinates: Point[] = [];
            let currentParent = parents[pointToString(currentPoint)];
        
            while (currentParent) {
                pathCoordinates.unshift(currentParent);
                currentParent = parents[pointToString(currentParent)];
            }
        
            return pathCoordinates;
        }
        

        bfsExploreDirections(currentPoint, rows, columns, visited, grid, queue, parents);
    }
    return [];
}
