/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITile } from "../../static/tile";
import { Color } from "../../theme/theme";

const presetPDF: number[][] = [[Math.random()]];

const tilesImgsPDF: any = {};
const panelImgPDF: any = { draw: function () {} };

let tileCallbackPDF: any = function () {};
const tileSaveCallbackPDF: any = function () {};
let tileTimeout: any;
export function setTileCallbackTimedPDF(func: any) {
  clearTimeout(tileTimeout);
  tileCallbackPDF = func;
  tileTimeout = setTimeout(func, 200);
}
export function setTileCallback(func: any) {
  clearTimeout(tileTimeout);
  tileCallbackPDF = func;
  func();
}

let panelCallbackPDF: any = function () {};
let panelSaveCallbackPDF: any = function () {};
let panelTimeout: any;
export function setPanelCallbackTimedPDF(func: any) {
  clearTimeout(panelTimeout);
  panelCallbackPDF = func;
  panelTimeout = setTimeout(func, 200);
}
export function setPanelCallbackPDF(func: any) {
  clearTimeout(panelTimeout);
  panelCallbackPDF = func;
  func();
}
export function setPanelSaveCallback(func: any) {
  panelSaveCallbackPDF = func;
}

export let isPanelLoadedPDF: boolean = false;
export const areTilesLoadedPDF: any = {
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
class TileImgPDF {
  img: any = new Image();
  loaded: boolean = false;
  width: number = 48;
  // private draw: ((x: number, y: number, heightOfTile: number, ctx: any) => void) | undefined;
  constructor(path: string, size: 71 | 85) {
    const tileObjPDF = areTilesLoadedPDF[size];
    this.img.onload = () => {
      ++tileObjPDF.loaded;
      if (tileObjPDF.loaded >= tileObjPDF.total) tileObjPDF.b = true;
      this.loaded = true;
      this.draw = function (
        x?: number,
        y?: number,
        heightOfTile?: number,
        ctx?: any
      ) {
        ctx.drawImage(this.img, x, y, this.width, heightOfTile);
      };
      tileCallbackPDF();
      tileSaveCallbackPDF();
    };
    this.img.src = path;
  }
  draw() {}

  computeWidth(heightOfTile: number) {
    this.width = this.loaded
      ? Math.round(((this.img.width / this.img.height) * heightOfTile) / 2) * 2
      : heightOfTile * 3.38;
  }
}

export let tileCanvasCtxPDF: any = null;
export let panelCanvasCtxPDF: any = null;
export let tileCanvasHeightPDF: number = 0,
  tileCanvasWidthPDF: number = 0;
export let panelCanvasHeightPDF: number = 0,
  panelCanvasWidthPDF: number = 0;

export function loadAddedTilePDF(tile: ITile, size: 71 | 85) {
  areTilesLoadedPDF[size].b = false;
  tilesImgsPDF[tile.id] = [];

  areTilesLoadedPDF[size].total += tile.imgs;
  for (let i = 0; i < tile.imgs; ++i) {
    tilesImgsPDF[tile.id][i] = new TileImgPDF(tile.background, size);
  }
}

export function removeTilePDF(tile: ITile, size: 71 | 85) {
  const tilesVariationsCopyPDF = tilesImgsPDF[tile.id];
  delete tilesImgsPDF[tile.id];
  let count = 0;
  for (const element of tilesVariationsCopyPDF) {
    if (element.loaded) ++count;
  }
  areTilesLoadedPDF[size].loaded -= count;
  areTilesLoadedPDF[size].total -= tile.imgs;
}

function panelDrawPDF(
  panel: any,
  multiplier: number,
  ctx: any,
  width: number,
  height: number
) {
  ctx.fillRect(0, 0, width, height);
  const sourceImgHeight = panelImgPDF.img.height;
  const sourceImgWidth = panelImgPDF.img.width;

  for (let y = 0; y < height; y += Math.round(panel.height * multiplier)) {
    for (let x = 1; x < width; x += Math.round(panel.width * multiplier) + 1) {
      ctx.drawImage(
        panelImgPDF.img,
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

function panelOnloadPDF() {
  panelImgPDF.draw = panelDrawPDF;
  isPanelLoadedPDF = true;
  panelCallbackPDF();
  panelSaveCallbackPDF();
}

export function loadPanelPDF(path: string) {
  panelImgPDF.img = new Image();
  isPanelLoadedPDF = false;
  panelImgPDF.img.onload = panelOnloadPDF;
  panelImgPDF.img.src = path;
}

export function updateTileCanvasPDF(
  tiles: ITile[],
  heightOfTile: number,
  offsetX: number,
  offsetY: number,
  ctx: any,
  width: number,
  height: number,
  isTileSize71: boolean
) {
  initDrawTileCanvasPDF(ctx, width, height);
  if (tiles.length === 0) return;
  const distributionPDF: { value: number; id: number }[] = [
    { value: 0, id: -1 },
  ];
  const divisor = tiles[tiles.length - 1].value;
  for (let i = 0; i < tiles.length; ++i) {
    distributionPDF.push({
      value: (tiles[i].value - distributionPDF[i].value) / divisor,
      id: tiles[i].id,
    });
  }
  distributionPDF[distributionPDF.length - 1].value = 2;

  if (tiles) {
    for (let tile = 0; tile < tiles.length; ++tile) {
      const tileVarsPDF = tilesImgsPDF[tiles[tile].id];
      if (tileVarsPDF) {
        for (let variation = 0; variation < tileVarsPDF.length; ++variation) {
          tileVarsPDF[variation].computeWidth(heightOfTile);
        }
      }
    }
  }

  let row = 0;
  for (let y = 0; y < height; ++row, y += heightOfTile + offsetY) {
    let x = isTileSize71 ? 1 : 0;
    let randomTile = getRandomTileImgPDF(
      presetPDF[row][0],
      presetPDF[row][1],
      distributionPDF
    );
    if (row % 2 === 1) x = -Math.round((randomTile.width + offsetX) / 2);
    randomTile.draw(x, y, heightOfTile, ctx);
    x += randomTile.width + offsetX;
    for (let column = 2; x < width; column += 2) {
      randomTile = getRandomTileImgPDF(
        presetPDF[row][column],
        presetPDF[row][column + 1],
        distributionPDF
      );
      randomTile.draw(x, y, heightOfTile, ctx);
      x += randomTile.width + offsetX;
    }
  }
}

function getRandomTileImgPDF(
  random1: number,
  random2: number,
  distribution: any[]
) {
  let tileTypePDF = 0;
  for (let i = 1; i < distribution.length; ++i) {
    if (
      random1 >= distribution[i - 1].value &&
      random1 < distribution[i].value
    ) {
      tileTypePDF = distribution[i].id;
      break;
    }
  }
  const tileVariation = Math.floor(tilesImgsPDF[tileTypePDF].length * random2);
  return tilesImgsPDF[tileTypePDF][tileVariation];
}

export function updatePanelCanvasPDF(
  panel: any,
  multiplier: number,
  ctx: any,
  width: number,
  height: number
) {
  panelImgPDF.draw(panel, multiplier, ctx, width, height);
}

export function initTileCanvasPDF(canvas: HTMLCanvasElement) {
  tileCanvasHeightPDF = canvas.clientHeight;
  tileCanvasWidthPDF = canvas.clientWidth;
  canvas.height = tileCanvasHeightPDF;
  canvas.width = tileCanvasWidthPDF;

  tileCanvasCtxPDF = canvas.getContext("2d", { alpha: false });
  tileCanvasCtxPDF.fillStyle = Color.GREY;

  initTilePresetPDF(tileCanvasWidthPDF, tileCanvasHeightPDF);
  initDrawTileCanvasPDF(
    tileCanvasCtxPDF,
    tileCanvasWidthPDF,
    tileCanvasHeightPDF
  );
}

export function initTilePresetPDF(width: number, height: number) {
  const rows = Math.ceil(height / 16);
  const columns = Math.ceil(width / 54) * 2 + 2;
  const lastVisibleRowAsPresetLength = Math.min(presetPDF.length, rows);

  if (presetPDF[lastVisibleRowAsPresetLength - 1].length < columns) {
    for (let row = 0; row < lastVisibleRowAsPresetLength; ++row) {
      for (let column = presetPDF[row].length; column < columns; ++column) {
        presetPDF[row][column] = Math.random();
      }
    }
  }

  if (lastVisibleRowAsPresetLength < rows) {
    for (let row = presetPDF.length; row < rows; ++row) {
      presetPDF[row] = [];
      for (let column = 0; column < columns; ++column) {
        presetPDF[row][column] = Math.random();
      }
    }
  }
}

export function initDrawTileCanvasPDF(ctx: any, width: number, height: number) {
  if (ctx === null) return;
  ctx.fillRect(0, 0, width, height);
}

export function initPanelCanvasPDF(canvas: HTMLCanvasElement) {
  panelCanvasHeightPDF = canvas.clientHeight;
  panelCanvasWidthPDF = canvas.clientWidth;
  canvas.height = panelCanvasHeightPDF;
  canvas.width = panelCanvasWidthPDF;

  panelCanvasCtxPDF = canvas.getContext("2d", { alpha: false });
  panelCanvasCtxPDF.fillStyle = Color.GREY;
  panelCanvasCtxPDF.fillRect(0, 0, panelCanvasWidthPDF, panelCanvasHeightPDF);
}
