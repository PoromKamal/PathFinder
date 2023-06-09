import PathGrid from '@/components/PathGrid';
import {BoardEnum, BoardConfig, BoardIdx} from "../utils/BoardConfig"

export default function Home() {
  const grid = createMatrix(BoardConfig.rows, BoardConfig.columns, BoardConfig.default_start, BoardConfig.default_end);

  function createMatrix(row: number, column: number, 
                        start: BoardIdx, end: BoardIdx) : number[][] {
    let matrix = [];
    
    //Normalize the start, and end if they're out of bounds
    if(start.row < 0 || start.row >= row || start.column < 0 || start.column >= column){
      start = {row: 0, column: 0};
    }

    if(end.row < 0 || end.row >= row || end.column < 0 || end.column >= column){
      end = {row: row - 1, column: column - 1};
    }

    for (let i = 0; i < row; i++) {
      const row = [];
      for (let j = 0; j < column; j++) {
        row.push(0);
      }
      matrix.push(row);
    }

    matrix[start.row][start.column] = BoardEnum.START;
    matrix[end.row][end.column] = BoardEnum.END;

    return matrix;
  }

  return (
    <main className="flex h-full w-full flex-col">
      <div className="flex w-full h-full m-auto">
        <PathGrid grid={grid}/>
      </div>
    </main>
  )
}
