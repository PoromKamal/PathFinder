import PathGrid from '@/components/PathGrid';
import Image from 'next/image'

export default function Home() {

  /* For testing purposes probably */
  function createMatrix(row: number, column: number) {
    let matrix = [];
    let idx = 1;
    for (let i = 0; i < row; i++) {
      const row = [];
      for (let j = 0; j < column; j++) {
        row.push(idx);
        idx++;
      }
      matrix.push(row);
    }
    return matrix;
  }

  return (
    <main className="flex h-full w-full flex-col">
      <div className="flex w-full h-full m-auto">
        <PathGrid grid={createMatrix(20, 40)} />
      </div>

    </main>
  )
}
