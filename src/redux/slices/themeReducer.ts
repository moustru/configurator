import { Theme } from "../../theme/theme";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  theme: Theme | null;
  isDark: boolean;
}

const initialState: IState = {
  theme: null,
  isDark: false,
};

export const themeReducer = createSlice({
  name: "themeReducer",
  initialState,
  reducers: {
    setTheme: (state: IState, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      state.isDark = action.payload === Theme.DARK;
    },
  },
});

export const { setTheme } = themeReducer.actions;

export default themeReducer.reducer;
