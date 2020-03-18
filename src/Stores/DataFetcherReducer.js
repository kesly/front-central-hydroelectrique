import {
  ADD_HYDRAULIC_TO_FETCHER, ADD_TURBINE_TO_FETCHER, ADD_ATTRIBUTE_TO_FETCHER,
  DEL_HYDRAULIC_FROM_FETCHER, DEL_TURBINE_FROM_FETCHER, DEL_ATTRIBUTE_FROM_FETCHER
} from './DataFetcherActions';

export default function dataFetcherReducer(state = {}, action) {
  console.log("DataFetcherReducer", action, state)

  switch (action.type) {

    case ADD_HYDRAULIC_TO_FETCHER:
      return {
        ...state,
        [action.hydraulicID]: {
          [action.turbineID]: []
        }
      };

    case ADD_TURBINE_TO_FETCHER:
      return {
        ...state,
        [action.hydraulicID]: {
          ...state[action.hydraulicID],
          [action.turbineID]: []
        }
      };

    case ADD_ATTRIBUTE_TO_FETCHER:
      return {
        ...state,
        [action.hydraulicID]: {
          ...state[action.hydraulicID],
          [action.turbineID]: [
            ...state[action.hydraulicID][action.turbineID],
            action.attribute
          ]
        }
      };

    case DEL_HYDRAULIC_FROM_FETCHER:
      let filteredState = Object.keys(state).reduce((stateObj, hydraulicID) => {
        if (hydraulicID !== action.hydraulicID) {
          return {
            ...stateObj,
            [hydraulicID]: state[hydraulicID]
          };
        } else {
          return stateObj;
        }
      }, {});

      return filteredState;

    case DEL_TURBINE_FROM_FETCHER:
      let filteredHydraulic = Object.keys(state[action.hydraulicID]).reduce((hydraulicObj, turbineID) => {
        if (turbineID !== action.turbineID) {
          return {
            ...hydraulicObj,
            [turbineID]: state[action.hydraulicID][turbineID]
          };
        } else {
          return hydraulicObj;
        }
      }, {});

      return {
        ...state,
        [action.hydraulicID]: filteredHydraulic
      };

    case DEL_ATTRIBUTE_FROM_FETCHER:
      let filteredTurbine = state[action.hydraulicID][action.turbineID].filter((turbineObj, attribute) => {
        return state[action.hydraulicID][action.turbineID][attribute] !== action.attribute;
      });

      return {
        ...state,
        [action.hydraulicID]: {
          ...state[action.hydraulicID],
          [action.turbineID]: filteredTurbine
        }
      };

    default:
      return state;

  }

}
