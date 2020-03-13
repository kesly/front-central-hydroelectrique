import { combineReducers } from "redux";
import catalogReducer from "./CatalogReducer";
import dataReducer from "./DataReducer";

export default combineReducers({
  catalog: catalogReducer,
  data: dataReducer
});
