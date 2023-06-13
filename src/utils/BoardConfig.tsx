/* Had to use this file since storing in a client file (PathGrid) will make the nextjs server side stuff start crying */
export const BoardEnum = {
  EMPTY: 0, //Uncoloured
  WALL: 1, //Black
  START: 2, // Start Point (Green)
  END: 3, // End point (Red)
  VISITED: 4, // Visited (Blue)
}

export const BoardConfig = {
  rows: 20,
  columns: 40,
  default_start: {row: 10, column: 0},
  default_end: {row: 10, column: 39},
} 

export interface BoardIdx {
  row: number;
  column: number;
}
