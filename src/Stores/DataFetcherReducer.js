import {
  ADD_HYDRAULIC_TO_FETCHER, ADD_TURBINE_TO_FETCHER, ADD_ATTRIBUTE_TO_FETCHER,
  DEL_HYDRAULIC, DEL_TURBINE, DEL_ATTRIBUTE
} from './DataFetcherActions';

export default function dataFetcherReducer(state = {}, action) {

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

    case DEL_HYDRAULIC:
      let filteredState = Object.keys(state).reduce((dataObj, hydraulicID) => {
        if (hydraulicID !== action.hydraulicID) {
          return {
            ...dataObj,
            [hydraulicID]: state[hydraulicID]
          };
        } else {
          return dataObj;
        }
      }, {});

      return filteredState;

    case DEL_TURBINE:
    // Pas bien fait quand hydraulic est vide
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
      }

    case DEL_ATTRIBUTE:
      let filteredTurbine = state[action.hydraulicID][action.turbineID].filter((turbineObj, attribute) => {
        return state[action.hydraulicID][action.turbineID][attribute] !== action.attribute;
      });

      return {
        ...state,
        [action.hydraulicID]: {
          ...state[action.hydraulicID],
          [action.turbineID]: filteredTurbine
        }
      }

    default:
      return state;

  }

}
