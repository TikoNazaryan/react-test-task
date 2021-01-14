import { createStore, combineReducers } from "redux";
import pagesReducer from "./pages";
import activeReducer from "./active";

const store = createStore(
  combineReducers({ page: pagesReducer, active: activeReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
