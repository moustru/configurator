import { combineReducers } from "@reduxjs/toolkit";
import sliderbarReducer from "./slices/sliderbarReducer";
import themeReducer from "./slices/themeReducer";

const rootReducer = combineReducers({
  theme: themeReducer,
  sidebar: sliderbarReducer,
});

export default rootReducer;
