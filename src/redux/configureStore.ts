import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import takeListSlice from "./takeListSlice";

const reducer = combineReducers({
  button: takeListSlice
});
export const store = configureStore({ reducer });
// dodajemy dodatkowe hooki i typy do zabezpieczenia reduxa
// typescript wywnioskuje RootState z store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;