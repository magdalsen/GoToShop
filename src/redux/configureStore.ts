import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import takeListSlice from "./takeListSlice";
import filterSlice from "./filterSlice";

const reducer = combineReducers({
  button: takeListSlice,
  filter: filterSlice
});
export const store = configureStore({ reducer });
// dodajemy dodatkowe hooki i typy do zabezpieczenia reduxa
// typescript wywnioskuje RootState z store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;