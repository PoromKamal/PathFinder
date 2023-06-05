"use client";
import React, {useState, useEffect} from "react"

interface PathGridProps {
  grid: Number[][];
};

export default function PathGrid(props: PathGridProps){
  const [grid, setGrid] = useState(props.grid);
  useEffect(() => { props.grid.map((row, i) => {console.log(row)})}, [grid]);
  return(
    <>
    <div className="flex-col m-auto text-lg">
      Rendering a {grid.length}x{grid[0].length} grid
      {grid.map((row, i) => {
          return <div key={i} className="flex">
              {row.map((cell, j) => (
                <div key={j} className="w-14 h-14 border border-gray-300 flex items-center justify-center">
                  {}
                </div>
            ))}
          </div>
        })}
    </div>
    </>
  );
}