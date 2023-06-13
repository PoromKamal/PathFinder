import { BoardEnum } from "@/utils/BoardConfig";
import { Point, ParentMap, directions, pointToString, isValid} from "@/utils/GridUtils";

export function djikstras(grid: Number[][], start: Point, end: Point) {
  let distance: number[] = [];
  let previous: Point[] = [];

  /* Init distance to inf, and preivous to NULL */
  for (let i = 0; i < grid.length; i++) {
    distance.push(Infinity);
    previous.push({row: null, column: null});
  }
}