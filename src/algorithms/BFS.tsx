import { BoardEnum } from "@/utils/BoardConfig";
import { Point, ParentMap, directions, pointToString, isValid} from "@/utils/GridUtils";

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
