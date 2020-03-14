import { combineReducers } from "redux";
import hydraulicsReducer from "./Catalog";

export default combineReducers({
  catalog: hydraulicsReducer
});
