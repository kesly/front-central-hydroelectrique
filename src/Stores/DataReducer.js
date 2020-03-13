import {
  ADD_GRAPH,
  DEL_HYDRAULIC,
  DEL_TURBINE,
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR
} from './DataActions';

const initialState = {
  data: {}
};

const hydraulicInitialState = {
  high: {
    data: {},
    loading: false,
    error: null
  }
}

const turbineInitialState = {
  debit: {
    data: {},
    loading: false,
    error: null
  },
  power: {
    data: {},
    loading: false,
    error: null
  }
}

export default function dataReducer(state = initialState, action) {
  console.log('dataReducer', state, action);

  switch (action.type) {

    case ADD_GRAPH:
      if(!state.data.hasOwnProperty(action.hydraulicID)) {
        return {
          data: {
            ...state.data,
            [action.hydraulicID]: {
              ...hydraulicInitialState,
              [action.turbineID]: turbineInitialState
            }
          }
        };
      }

      if(!state.data[action.hydraulicID].hasOwnProperty(action.turbineID)) {
        return {
          data: {
            ...state.data,
            [action.hydraulicID]: {
              ...state.data[action.hydraulicID],
              [action.turbineID]: turbineInitialState
            }
          }
        };
      }

      return state;

  case DEL_HYDRAULIC:
    return {
      data: Object.keys(state.data).reduce((dataObj, hydraulicID) => {
        if (hydraulicID != action.hydraulicID) {
          return {
            ...dataObj,
            [hydraulicID]: state.data[hydraulicID]
          };
        } else {
          return dataObj;
        }
      }, {})
    }

  case DEL_TURBINE:
    return {
      data: {
        ...state.data,
        [action.hydraulicID]: Object.keys(state.data[action.hydraulicID]).reduce((hydraulicObj, turbineID) => {
          if (turbineID != action.turbineID) {
            return {
              ...hydraulicObj,
              [turbineID]: state.data[action.hydraulicID][turbineID]
            };
          } else {
            return hydraulicObj;
          }
        }, {})
      }
    }

    case FETCH_DATA_BEGIN:
    // Différencier data de centrale et data de turbine
      return {
        data: {
          ...state.data,
          [action.hydraulicID]: {
            ...state.data[action.hydraulicID],
            [action.turbineID]: {
              ...state.data[action.hydraulicID][action.turbineID],
              [action.attribute]: {
                ...state.data[action.hydraulicID][action.turbineID][action.attribute],
                loading: true,
                error: null
              }
            }
          }
        }
      };

    case FETCH_DATA_SUCCESS:
    // Différencier data de centrale et data de turbine
      return {
        data: {
          ...state.data,
          [action.hydraulicID]: {
            ...state.data[action.hydraulicID],
            [action.turbineID]: {
              ...state.data[action.hydraulicID][action.turbineID],
              [action.attribute]: {
                ...state.data[action.hydraulicID][action.turbineID][action.attribute],
                data: {
                  ...state.data[action.hydraulicID][action.turbineID][action.attribute].data,
                  ...action.data.data
                },
                loading: false
              }
            }
          }
        }
      };

    case FETCH_DATA_ERROR:
    // Différencier data de centrale et data de turbine
      return {
        data: {
          ...state.data,
          [action.hydraulicID]: {
            ...state.data[action.hydraulicID],
            [action.turbineID]: {
              ...state.data[action.hydraulicID][action.turbineID],
              [action.attribute]: {
                ...state.data[action.hydraulicID][action.turbineID][action.attribute],
                loading: false,
                error: action.data.error
              }
            }
          }
        }
      };

    default:
      return state;

  }

}
