import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITile } from "../../static/tile";
import {
  loadAddedTile,
  loadPanel,
  removeTile,
} from "../../modules/canvas/Draw";
import {
  loadAddedTilePDF,
  loadPanelPDF,
  removeTilePDF,
} from "../../modules/canvas/DrawPDF";
import { selectTileInData } from "../../modules/utils/chooseTile";

interface IState {
  buttonPanel: boolean;
  buttonTile: boolean;
  panel: {
    color: string;
    width: number;
    height: number | number[];
  };
  tile: {
    85: ITile[];
    71: ITile[];
    size: 85 | 71;
  };
}

const initialState: IState = {
  buttonPanel: false,
  buttonTile: false,
  panel: {
    color: "",
    width: 600,
    height: 300,
  },
  tile: {
    85: [] as ITile[],
    71: [] as ITile[],
    size: 71,
  },
};

export const sliderbarReducer = createSlice({
  name: "slidebarReducer",
  initialState,
  reducers: {
    setType: (state: IState, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "panel":
          return { ...state, buttonPanel: true, buttonTile: false };
        case "tile":
          return { ...state, buttonPanel: false, buttonTile: true };
        case "landing":
          return { ...state, buttonPanel: false, buttonTile: false };
        default:
          return state;
      }
    },
    setColor: (state: IState, action: PayloadAction<string>) => {
      loadPanel("panel/" + state.panel.height + "-" + action.payload + ".jpg");
      loadPanelPDF(
        "panel/" + state.panel.height + "-" + action.payload + ".jpg"
      );
      state.panel.color = action.payload;
    },
    setWidth: (state: IState, action: PayloadAction<number>) => {
      state.panel.width = action.payload;
    },
    setHeight: (state: IState, action: PayloadAction<number | number[]>) => {
      loadPanel("panel/" + action.payload + "-" + state.panel.color + ".jpg");
      loadPanelPDF(
        "panel/" + action.payload + "-" + state.panel.color + ".jpg"
      );
      state.panel.height = action.payload;
    },
    setSize: (state: IState, action: PayloadAction<85 | 71>) => {
      state.tile.size = action.payload;
    },
    setTileState: (state: IState, action: PayloadAction<number[]>) => {
      const arrTileCurrent = state.tile[state.tile.size];
      for (let i = 0; i < arrTileCurrent.length; ++i) {
        arrTileCurrent[i].value = action.payload[i];
      }
    },
    setAddTile: (state: IState, action: PayloadAction<ITile>) => {
      selectTileInData(action.payload, true);
      loadAddedTile(action.payload, state.tile.size);
      loadAddedTilePDF(action.payload, state.tile.size);
      const arrTileCurrent = state.tile[state.tile.size];
      for (let i = 1, l = arrTileCurrent.length + 1; i < l; ++i) {
        arrTileCurrent[i - 1].value = Math.floor((i / l) * 100);
      }
      arrTileCurrent.push(action.payload);
    },
    setRemoveTile: (state: IState, action: PayloadAction<ITile>) => {
      selectTileInData(action.payload, false);
      removeTile(action.payload, state.tile.size);
      removeTilePDF(action.payload, state.tile.size);
      const arrTileCurrent = state.tile[state.tile.size];
      const l = arrTileCurrent.length - 1;
      for (let i = 0, ln = 1; i < l + ln; ++i) {
        const tile = arrTileCurrent[i];
        if (tile.id === action.payload.id) {
          arrTileCurrent.splice(i, 1);
          --i;
          --ln;
          continue;
        }
        tile.value = Math.floor(((i + 1) / l) * 100);
      }
      if (l > 0) arrTileCurrent[l - 1].value = 100;
    },
    initTile: (state: IState, action: PayloadAction<IState["tile"]>) => {
      action.payload[85].forEach((tile) => {
        selectTileInData(tile, true);
        loadAddedTile(tile, 85);
        loadAddedTilePDF(tile, 85);
      });
      action.payload[71].forEach((tile) => {
        selectTileInData(tile, true);
        loadAddedTile(tile, 71);
        loadAddedTilePDF(tile, 71);
      });
      state.tile = action.payload;
    },
    initPanel: (state: IState, action: PayloadAction<IState["panel"]>) => {
      loadPanel(
        "panel/" + action.payload.height + "-" + action.payload.color + ".jpg"
      );
      loadPanelPDF(
        "panel/" + action.payload.height + "-" + action.payload.color + ".jpg"
      );
      state.panel = action.payload;
    },
  },
});

export const {
  setType,
  setColor,
  setHeight,
  setWidth,
  setSize,
  setTileState,
  setAddTile,
  setRemoveTile,
  initTile,
  initPanel,
} = sliderbarReducer.actions;

export default sliderbarReducer.reducer;
