import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import takeListSlice from "./takeListSlice";

const reducer = combineReducers({
  button: takeListSlice
});
export const store = configureStore({ reducer });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;