import {
  FETCH_CATALOG_BEGIN,
  FETCH_CATALOG_SUCCESS,
  FETCH_CATALOG_ERROR
} from './CatalogActions';

const initialState = {
  hydraulicsID: {},
  loading: false,
  error: null
};

export default function hydraulicsReducer(state = initialState, action) {
  console.log('reducer', state, action);

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
        hydraulicsID: action.hydraulicsID.data,
        loading: false
      };

    case FETCH_CATALOG_ERROR:
      return {
        ...state,
        hydraulicsID: {},
        loading: false,
        error: action.hydraulicsID.error
      };

    // case 'ADD_HYDRAULIC':
    //  return {
    //    hydraulicsID: {
    //      ...state.hydraulicsID,
    //      [action.hydraulicID]: []
    //    }
    //  };

    // case 'DEL_HYDRAULIC':
    //   return state.filter((hydraulic, index) => {
    //     if (hydraulic.hydraulicID !== action.hydraulicID) {
    //       return hydraulic
    //     }
    //   })

      // case 'ADD_TURBINE':
      //   return {
      //     hydraulicsID: {
      //       ...state.hydraulicsID,
      //       [action.hydraulicID]: [
      //         ...state.hydraulicsID[action.hydraulicID],
      //         action.turbineID
      //       ]
      //     }
      //   };

    // case 'DEL_TURBINE':
    //   return state.filter((hydraulic, index) => {
    //     if (hydraulic.hydraulicID !== action.hydraulicID) {
    //       return hydraulic
    //     }
    //   })

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
