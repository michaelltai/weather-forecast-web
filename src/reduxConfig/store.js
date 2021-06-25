import { createStore, combineReducers } from "redux";
import weatherReducers from "./reducers/weatherReducers.js";

const rootReducer = combineReducers({
  weatherReducers: weatherReducers,
});

export const store = createStore(rootReducer);
