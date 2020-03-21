import {
  ADD_HYDRAULIC_TO_GRAPH, ADD_ATTRIBUTE_TO_GRAPH,
  DEL_HYDRAULIC_FROM_GRAPH, DEL_ATTRIBUTE_FROM_GRAPH
} from './GraphActions';

export default function graphReducer(state = {}, action) {

  let graphParameters = action.attribute2 ? {
    turbineID: action.turbineID,
    attribute1: action.attribute1,
    attribute2: action.attribute2
  } : {
    turbineID: action.turbineID,
    attribute1: action.attribute1
  };

  switch (action.type) {

    case ADD_HYDRAULIC_TO_GRAPH:
      return {
        ...state,
        [action.hydraulicID]: [
          graphParameters
        ]
      };

    case ADD_ATTRIBUTE_TO_GRAPH:
      return {
        ...state,
        [action.hydraulicID]: [
          ...state[action.hydraulicID],
          graphParameters
        ]
      };

    case DEL_HYDRAULIC_FROM_GRAPH:
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

    case DEL_ATTRIBUTE_FROM_GRAPH:
      let filteredHydraulic = state[action.hydraulicID].filter((hydraulicObj, attribute) => {
        return JSON.stringify(state[action.hydraulicID][attribute]) !== JSON.stringify(graphParameters);
      });

      return {
        ...state,
        [action.hydraulicID]: filteredHydraulic
      };

    default:
      return state;

  }

}
