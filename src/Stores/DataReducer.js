import { ADD_HYDRAULIC_TO_DATA, ADD_TURBINE_TO_DATA, ADD_ATTRIBUTE_TO_DATA } from './DataActions';
import { FETCH_DATA_BEGIN, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from './DataActions';

const attributeInitialState = {
  data: {},
  loading: false,
  error: null
}

export default function dataReducer(state = {}, action) {
  console.log("==================================================================================")
  console.log("DataReducer", action, state)

  switch (action.type) {

    case ADD_HYDRAULIC_TO_DATA:
      return {
        ...state,
        [action.hydraulicID]: {
          [action.turbineID]: {}
        }
      };

    case ADD_TURBINE_TO_DATA:
      return {
        ...state,
        [action.hydraulicID]: {
          ...state[action.hydraulicID],
          [action.turbineID]: {}
        }
      };

    case ADD_ATTRIBUTE_TO_DATA:
      return {
        ...state,
        [action.hydraulicID]: {
          ...state[action.hydraulicID],
          [action.turbineID]: {
            ...state[action.hydraulicID][action.turbineID],
            [action.attribute]: attributeInitialState
          }
        }
      };

    case FETCH_DATA_BEGIN:
      return {
        ...state,
        [action.hydraulicID]: {
          ...state[action.hydraulicID],
          [action.turbineID]: {
            ...state[action.hydraulicID][action.turbineID],
            [action.attribute]: {
              ...state[action.hydraulicID][action.turbineID][action.attribute],
              loading: true,
              error: null
            }
          }
        }
      };

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        [action.hydraulicID]: {
          ...state[action.hydraulicID],
          [action.turbineID]: {
            ...state[action.hydraulicID][action.turbineID],
            [action.attribute]: {
              ...state[action.hydraulicID][action.turbineID][action.attribute],
              data: {
                ...state[action.hydraulicID][action.turbineID][action.attribute].data,
                ...action.data
              },
              loading: false
            }
          }
        }
      };

    case FETCH_DATA_ERROR:
      return {
        ...state,
        [action.hydraulicID]: {
          ...state[action.hydraulicID],
          [action.turbineID]: {
            ...state[action.hydraulicID][action.turbineID],
            [action.attribute]: {
              ...state[action.hydraulicID][action.turbineID][action.attribute],
              loading: false,
              error: action.data.error
            }
          }
        }
      };

    default:
      return state;

  }

}
