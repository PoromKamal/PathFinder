"use client";
import React, {useState, useCallback} from "react"
import {BoardEnum, BoardConfig} from "../utils/BoardConfig"
import {IconButton } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import { HtmlTooltip } from "./HelpTooltip";
import Typography from '@mui/material/Typography';
import { bfs } from '../algorithms/BFS';


interface PathGridProps {
  grid: Number[][];
};

export default function PathGrid(props: PathGridProps){
  const [grid, setGrid] = useState(props.grid);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isStartSelected, setIsStartSelected] = useState(false);
  const [isEndSelected, setIsEndSelected] = useState(false);
  const [startIdx, setStartIdx] =  useState({row: BoardConfig.default_start.row, 
                                        column: BoardConfig.default_start.column});
  const [endIdx, setEndIdx] = useState({row: BoardConfig.default_end.row, 
                                      column: BoardConfig.default_end.column});
  const [isLocked , setIsLocked] = useState(false);
  
  const board_colour_map = {
    [BoardEnum.EMPTY] : "bg-white",
    [BoardEnum.WALL] : "bg-black",
    [BoardEnum.START] : "bg-green-500",
    [BoardEnum.END] : "bg-red-500",
    [BoardEnum.VISITED] : "bg-blue-500",
  }

  const handlePathFind = (algorithm: Function) => {
      const path = algorithm(grid, startIdx, endIdx);
      const newGrid = [...grid];
      if (path && !isLocked) {
        // Visualize the path
        path.forEach((point: { row: Number; column: Number; }, index: Number) => {
          if (index === 0) return;
          setTimeout(()=>{visitNode(point)}, 20 * Number(index));
        });
        setIsLocked(true);
      } else {
        // Handle the case where no path is found
        alert("No path found.");
      }
  };

  const visitNode = (node: { row: Number; column: Number; }) => {
    const newGrid = [...grid];
    newGrid[Number(node.row)][Number(node.column)] = BoardEnum.VISITED;
    setGrid(newGrid);
  }

  const handleReset = () => {
    grid.forEach(row => row.fill(BoardEnum.EMPTY));
    grid[BoardConfig.default_start.row][BoardConfig.default_start.column] = BoardEnum.START;
    grid[BoardConfig.default_end.row][BoardConfig.default_end.column] = BoardEnum.END;
    setStartIdx({row: BoardConfig.default_start.row, column: BoardConfig.default_start.column});
    setEndIdx({row: BoardConfig.default_end.row, column: BoardConfig.default_end.column});
    setIsLocked(false);
    setGrid(grid);

  }

  const handle_grid_enter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: Number, column: Number) =>{
    if(!isMouseDown || is_start_end_collided(row, column) || isLocked)
      return;

    if(isStartSelected){
      const temp_grid = [...grid];
      temp_grid[Number(row)][Number(column)] = BoardEnum.START;
      setStartIdx({row: Number(row), column: Number(column)});
      setGrid(temp_grid);
    } else if(isEndSelected){
      const temp_grid = [...grid];
      temp_grid[Number(row)][Number(column)] = BoardEnum.END;
      setEndIdx({row: Number(row), column: Number(column)});
      setGrid(temp_grid);
    } else{
      const cell_type = Number(e.currentTarget.getAttribute("cell-type"));
      colour_wall(cell_type, row, column);
    }
  };

  const colour_wall = (cell_type: Number, row: Number, column: Number) => {
    const temp_grid = [...grid];
    if(cell_type === BoardEnum.EMPTY){
      //Why the fuck do I have to do this, they're already Number type?
      temp_grid[Number(row)][Number(column)] = BoardEnum.WALL;
    }
    setGrid(temp_grid);
  }
  
  const is_start_end_collided = (row: Number, column: Number) : boolean => {
    return isStartSelected && row == endIdx.row && column == endIdx.column 
          || isEndSelected && row == startIdx.row && column == startIdx.column
  }


  const handle_mouse_leave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: Number, column: Number) => {
    const target = e.relatedTarget as HTMLDivElement;
    if(!target || isLocked)
      return;

    if(target.hasAttribute("cell-type")){
      const row = Number(target.getAttribute("row-grid"));
      const col = Number(target.getAttribute("col-grid"));
      if(is_start_end_collided(row, col))
        return;
    }

    const temp_grid = [...grid];
    if(isStartSelected){
      temp_grid[Number(row)][Number(column)] = BoardEnum.EMPTY;
      temp_grid[endIdx.row][endIdx.column] = BoardEnum.END;
      temp_grid[startIdx.row][startIdx.column] = BoardEnum.EMPTY;
    } else if(isEndSelected){
      temp_grid[Number(row)][Number(column)] = BoardEnum.EMPTY;
      temp_grid[startIdx.row][startIdx.column] = BoardEnum.START;
      temp_grid[endIdx.row][endIdx.column] = BoardEnum.EMPTY;
    }

    setGrid(temp_grid);
  }

  const handle_mouse_down = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: Number, column: Number) => {
    if (isLocked)
      return;
    setIsMouseDown(true);
    const cell_type = Number(e.currentTarget.getAttribute("cell-type"));
    colour_wall(cell_type, row, column);
    if(cell_type === BoardEnum.START){
      setIsStartSelected (true);
    } else if(cell_type === BoardEnum.END){
      setIsEndSelected (true);
    }
  }

  const handle_mouse_up = (row: Number, column: Number) => {
    if (isLocked)
      return;
    setIsMouseDown(false)
    const temp_grid = [...grid];

    if(is_start_end_collided(row, column))
      return;

    if(isStartSelected){
      setIsStartSelected (false);
      temp_grid[startIdx.row][startIdx.column] = BoardEnum.EMPTY;
      temp_grid[Number(row)][Number(column)] = BoardEnum.START;
      setStartIdx({row: Number(row), column: Number(column)});
    } else if(isEndSelected){
      setIsEndSelected(false);
      temp_grid[endIdx.row][endIdx.column] = BoardEnum.EMPTY;
      temp_grid[Number(row)][Number(column)] = BoardEnum.END;
      setEndIdx({row: Number(row), column: Number(column)});
    }
    setGrid (temp_grid);
  }


  return (
    <>
    <div className="flex-col m-auto text-lg">
      <div className="flex justify-between w-full">
        <div>
          Rendering a {grid.length}x{grid[0].length} grid
        </div>
        <div>
          <HtmlTooltip title={ <React.Fragment>
            <Typography color="inherit">Click on the grid to add walls!</Typography>
            <Typography color="inherit">You can also drag green start/red end</Typography>
            </React.Fragment>}>
            <IconButton>
              <HelpIcon />
            </IconButton>
          </HtmlTooltip>
        </div>
      </div>
      <div className="flex items-center justify-center" style={{margin: '2rem'}}>
        <button id="bfs" className="bg-black hover:bg-zinc-700" style={{color: 'white', outline: 'solid', padding: '1rem'}} onClick={() => handlePathFind(bfs)}>BFS</button>
        <button className="bg-black hover:bg-zinc-700" style={{color: 'white', outline: 'solid', padding: '1rem'}} onClick={handleReset}>Reset Grid</button>
      </div>


      {grid.map((row, i) => {
          return <div key={i} className="flex" draggable={false}>
              {row.map((cell, j) => (
                <div key={j} row-grid={i} col-grid={j} cell-type={cell} onMouseDown={(e)=>handle_mouse_down(e, i, j)} onDragStart={(e)=>e.preventDefault()}
                    onMouseLeave={(e)=>handle_mouse_leave(e, i, j)}
                    onMouseUp={()=>handle_mouse_up(i, j)} onMouseEnter={(e)=>handle_grid_enter(e, i, j)}
                    className={`w-14 h-14 border border-gray-300 flex items-center justify-center ${board_colour_map[Number(cell)]}`} />
            ))}
          </div>
        })}
    </div>
    </>
  );
}