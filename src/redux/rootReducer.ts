import { combineReducers } from "@reduxjs/toolkit";
import sliderbarReducer from "./slices/sliderbarReducer";

const rootReducer = combineReducers({
  sidebar: sliderbarReducer,
});

export default rootReducer;
