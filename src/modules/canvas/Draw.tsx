/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITile } from "../../static/tile";

const preset: number[][] = [[Math.random()]];

const tilesImgs: any = {};
const panelImg: any = { draw: function () {} };

let tileCallback: any = function () {};
const tileSaveCallback: any = function () {};
let tileTimeout: any;
export function setTileCallbackTimed(func: any) {
  clearTimeout(tileTimeout);
  tileCallback = func;
  tileTimeout = setTimeout(func, 200);
}
export function setTileCallback(func: any) {
  clearTimeout(tileTimeout);
  tileCallback = func;
  func();
}
let panelCallback: any = function () {};
let panelSaveCallback: any = function () {};
let panelTimeout: any;
export function setPanelCallbackTimed(func: any) {
  clearTimeout(panelTimeout);
  panelCallback = func;
  panelTimeout = setTimeout(func, 200);
}
export function setPanelCallback(func: any) {
  clearTimeout(panelTimeout);
  panelCallback = func;
  func();
}
export function setPanelSaveCallback(func: any) {
  panelSaveCallback = func;
}

export let isPanelLoaded: boolean = false;
export const areTilesLoaded: any = {
  71: {
    b: false,
    loaded: 0,
    total: 0,
  },
  85: {
    b: false,
    loaded: 0,
    total: 0,
  },
};
class TileImg {
  img: any = new Image();
  loaded: boolean = false;
  width: number = 1;
  constructor(path: string, size: 71 | 85) {
    const tileObj = areTilesLoaded[size];
    this.img.onload = () => {
      ++tileObj.loaded;
      if (tileObj.loaded >= tileObj.total) tileObj.b = true;
      this.loaded = true;
      this.draw = function (
        x?: number,
        y?: number,
        heightOfTile?: number,
        ctx?: any
      ) {
        ctx.drawImage(this.img, x, y, this.width, heightOfTile);
      };
      tileCallback();
      tileSaveCallback();
    };
    this.img.src = path;
  }
  draw() {}

  computeWidth(heightOfTile: number) {
    const ratio = 3.42; // (4.5) 240/71=3,38 | 240/85=2,82 | 48/14=3,42
    this.width = this.loaded
      ? Math.round(((this.img.width / this.img.height) * heightOfTile) / 2) * 2
      : heightOfTile * ratio;
  }
}

export let tileCanvasCtx: any = null;
export let panelCanvasCtx: any = null;
export let tileCanvasHeight: number = 0,
  tileCanvasWidth: number = 0;
export let panelCanvasHeight: number = 0,
  panelCanvasWidth: number = 0;

export function loadAddedTile(tile: ITile, size: 71 | 85) {
  areTilesLoaded[size].b = false;
  tilesImgs[tile.id] = [];

  areTilesLoaded[size].total += tile.imgs;
  for (let i = 0; i < tile.imgs; ++i) {
    tilesImgs[tile.id][i] = new TileImg(tile.background, size);
  }
}

export function removeTile(tile: ITile, size: 71 | 85) {
  const tilesVariationsCopy = tilesImgs[tile.id];
  delete tilesImgs[tile.id];
  let count = 0;
  for (const element of tilesVariationsCopy) {
    if (element.loaded) ++count;
  }
  areTilesLoaded[size].loaded -= count;
  areTilesLoaded[size].total -= tile.imgs;
}

function panelDraw(
  panel: any,
  multiplier: number,
  ctx: any,
  width: number,
  height: number
) {
  ctx.fillRect(0, 0, width, height);
  const sourceImgHeight = panelImg.img.height;
  const sourceImgWidth = panelImg.img.width;

  for (let y = 0; y < height; y += Math.round(panel.height * multiplier)) {
    for (
      let x = 1;
      x < width;
      x += Math.round((panel.width + 8) * multiplier)
    ) {
      ctx.drawImage(
        panelImg.img,
        0,
        0,
        sourceImgWidth,
        sourceImgHeight,
        x,
        y,
        Math.round(panel.width * multiplier),
        Math.round(panel.height * multiplier)
      );
    }
  }
}
function panelOnload() {
  panelImg.draw = panelDraw;
  isPanelLoaded = true;
  panelCallback();
  panelSaveCallback();
}

export function loadPanel(path: string) {
  panelImg.img = new Image();
  isPanelLoaded = false;
  panelImg.draw = function () {};
  panelImg.img.onload = panelOnload;
  panelImg.img.src = path;
}

export function updateTileCanvas(
  tiles: ITile[],
  heightOfTile: number,
  offsetX: number,
  offsetY: number,
  ctx: any,
  width: number,
  height: number,
  isTileSize71: boolean
) {
  initDrawTileCanvas(ctx, width, height);
  if (tiles.length === 0) return;
  const distribution: { value: number; id: number }[] = [{ value: 0, id: -1 }];
  const divisor = tiles[tiles.length - 1].value;
  for (let i = 0; i < tiles.length; ++i) {
    distribution.push({
      value: (tiles[i].value - distribution[i].value) / divisor,
      id: tiles[i].id,
    });
  }
  distribution[distribution.length - 1].value = 2;

  if (tiles) {
    for (const element of tiles) {
      const tileVars = tilesImgs[element.id];

      if (tileVars) {
        for (const element of tileVars) {
          element.computeWidth(heightOfTile);
        }
      }
    }
  }

  let row = 0;
  for (let y = 0; y < height; ++row, y += heightOfTile + offsetY) {
    let x = isTileSize71 ? 1 : 0;
    let randomTile = getRandomTileImg(
      preset[row][0],
      preset[row][1],
      distribution
    );
    if (row % 2 === 1) x = -Math.round((randomTile.width + offsetX) / 2);
    randomTile.draw(x, y, heightOfTile, ctx);
    x += randomTile.width + offsetX;
    for (let column = 2; x < width; column += 2) {
      randomTile = getRandomTileImg(
        preset[row][column],
        preset[row][column + 1],
        distribution
      );
      randomTile.draw(x, y, heightOfTile, ctx);
      x += randomTile.width + offsetX;
    }
  }
}

function getRandomTileImg(
  random1: number,
  random2: number,
  distribution: any[]
) {
  let tileType = 0;
  for (let i = 1; i < distribution.length; ++i) {
    if (
      random1 >= distribution[i - 1].value &&
      random1 < distribution[i].value
    ) {
      tileType = distribution[i].id;
      break;
    }
  }
  const tileVariation = Math.floor(tilesImgs[tileType].length * random2);
  return tilesImgs[tileType][tileVariation];
}

export function updatePanelCanvas(
  panel: any,
  multiplier: number,
  ctx: any,
  width: number,
  height: number
) {
  panelImg.draw(panel, multiplier, ctx, width, height);
}

export function initTileCanvas(canvas: HTMLCanvasElement) {
  tileCanvasHeight = canvas.clientHeight;
  tileCanvasWidth = canvas.clientWidth;
  canvas.height = tileCanvasHeight;
  canvas.width = tileCanvasWidth;

  tileCanvasCtx = canvas.getContext("2d", { alpha: false });
  tileCanvasCtx.fillStyle = "#010504";

  initTilePreset(tileCanvasWidth, tileCanvasHeight);
  initDrawTileCanvas(tileCanvasCtx, tileCanvasWidth, tileCanvasHeight);
}

export function initTilePreset(width: number, height: number) {
  const rows = Math.ceil(height / 20);
  const columns = Math.ceil(width / 34) * 2 + 2;

  const lastVisibleRowAsPresetLength = Math.min(preset.length, rows);

  if (lastVisibleRowAsPresetLength < rows) {
    for (let row = preset.length; row < rows; ++row) {
      preset[row] = [];
      for (let column = 0; column < columns; ++column) {
        preset[row][column] = Math.random();
      }
    }
  }

  if (preset[lastVisibleRowAsPresetLength - 1].length < columns) {
    for (let row = 0; row < lastVisibleRowAsPresetLength; ++row) {
      for (let column = preset[row].length; column < columns; ++column) {
        preset[row][column] = Math.random();
      }
    }
  }
}

export function initDrawTileCanvas(ctx: any, width: number, height: number) {
  if (ctx === null) return;
  ctx.fillRect(0, 0, width, height);
}

export function initPanelCanvas(canvas: HTMLCanvasElement) {
  panelCanvasHeight = canvas.clientHeight;
  panelCanvasWidth = canvas.clientWidth;
  canvas.height = panelCanvasHeight;
  canvas.width = panelCanvasWidth;

  panelCanvasCtx = canvas.getContext("2d", { alpha: false });
  panelCanvasCtx.fillStyle = "#010504";
  panelCanvasCtx.fillRect(0, 0, panelCanvasWidth, panelCanvasHeight);
}
