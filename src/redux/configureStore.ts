import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import statusSlice from "./statusSlice";
import takeListSlice from "./takeListSlice";

const reducer = combineReducers({
  button: takeListSlice,
  status: statusSlice
});
export const store = configureStore({ reducer });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;