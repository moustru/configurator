import { ITile, tileData } from "../../static/tile";

export const tileSelected: boolean[] = new Array(
  tileData[85].length + tileData[71].length
).fill(false);

export function selectTileInData(tile: ITile, isSelected: boolean) {
  tileSelected[tile.id - 1] = isSelected;
}
