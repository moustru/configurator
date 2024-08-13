/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  updateTileCanvas,
  updatePanelCanvas,
  initTilePreset,
} from "../canvas/Draw";

const canvas: HTMLCanvasElement = document.createElement("canvas");

function downloadCanvas(canvas: HTMLCanvasElement, name: string) {
  const link = document.createElement("a");
  link.download = name;
  link.href = canvas.toDataURL("image/jpeg", 1.0);
  link.click();
}

function initCanvas(width: number, height: number) {
  canvas.width = width;
  canvas.height = height;
  const ctx: any = canvas.getContext("2d", { alpha: false });
  return ctx;
}

export function downloadJPEGTile71(
  state: any,
  width: number,
  height: number,
  multiplier: number
) {
  initTilePreset(Math.ceil(width / multiplier), Math.ceil(height / multiplier));
  updateTileCanvas(
    state.tile[71],
    Math.ceil(20 * multiplier),
    Math.ceil(2 * multiplier),
    Math.ceil(2 * multiplier),
    initCanvas(width, height),
    width,
    height,
    true
  );
  downloadCanvas(canvas, "Tile_Size_71_Texture.jpg");
}

export function downloadJPEGTile85(
  state: any,
  width: number,
  height: number,
  multiplier: number
) {
  initTilePreset(Math.ceil(width / multiplier), Math.ceil(height / multiplier));
  updateTileCanvas(
    state.tile[85],
    Math.ceil(24 * multiplier),
    0,
    0,
    initCanvas(width, height),
    width,
    height,
    false
  );
  downloadCanvas(canvas, "Tile_Size_85_Texture.jpg");
}

export function downloadJPEGPanel(
  state: any,
  width: number,
  height: number,
  multiplier: number
) {
  updatePanelCanvas(
    state.panel,
    0.25 * multiplier,
    initCanvas(width, height),
    width,
    height
  );
  downloadCanvas(canvas, "Panel_Texture.jpg");
}
