import {
  FETCH_CATALOG_BEGIN,
  FETCH_CATALOG_SUCCESS,
  FETCH_CATALOG_ERROR
} from './CatalogActions';

const initialState = {
  catalog: {},
  loading: false,
  error: null
};

export default function catalogReducer(state = initialState, action) {

  switch (action.type) {

    case FETCH_CATALOG_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_CATALOG_SUCCESS:
      return {
        ...state,
        catalog: action.catalog.data,
        loading: false
      };

    case FETCH_CATALOG_ERROR:
      return {
        ...state,
        catalog: {},
        loading: false,
        error: action.catalog.error
      };

    default:
      return state;

  }

}

// const store = createStore(
//   hydraulicsReducer,
//   applyMiddleware(thunk)
// );
//
// export default store;
