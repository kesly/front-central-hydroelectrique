import { combineReducers } from "redux";
import catalogReducer from "./CatalogReducer";
import dataReducer from "./DataReducer";
import dataFetcherReducer from "./DataFetcherReducer";

export default combineReducers({
  catalog: catalogReducer,
  data: dataReducer,
  dataFetcher: dataFetcherReducer
});
