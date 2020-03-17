import { combineReducers } from "redux";
import catalogReducer from "./CatalogReducer";
import dataReducer from "./DataReducer";
import dataFetcherReducer from "./DataFetcherReducer";
import graphReducer from "./GraphReducer";

export default combineReducers({
  catalog: catalogReducer,
  data: dataReducer,
  dataFetcher: dataFetcherReducer,
  graphs: graphReducer
});
