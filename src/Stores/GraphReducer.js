import {
  ADD_HYDRAULIC_TO_GRAPH, ADD_TURBINE_TO_GRAPH, ADD_ATTRIBUTE_TO_GRAPH,
  DEL_HYDRAULIC_FROM_GRAPH, DEL_TURBINE_FROM_GRAPH, DEL_ATTRIBUTE_FROM_GRAPH
} from './GraphActions';

function arrayAreEquals(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i=0; i<array1.length; i++) {
    if (!array2.includes(array1[i])) {
      return false;
    }
  }

  return true;
}

export default function graphReducer(state = {}, action) {
  console.log(action, state)

  switch (action.type) {

    case ADD_HYDRAULIC_TO_GRAPH:
      return {
        ...state,
        [action.hydraulicID]: {
          [action.turbineID]: [
            (action.attribute2 ? [action.attribute1, action.attribute2] : [action.attribute1])
          ]
        }
      };

    case ADD_TURBINE_TO_GRAPH:
      return {
        ...state,
        [action.hydraulicID]: {
          ...state[action.hydraulicID],
          [action.turbineID]: [
            (action.attribute2 ? [action.attribute1, action.attribute2] : [action.attribute1])
          ]
        }
      };

    case ADD_ATTRIBUTE_TO_GRAPH:
      return {
        ...state,
        [action.hydraulicID]: {
          ...state[action.hydraulicID],
          [action.turbineID]: [
            ...state[action.hydraulicID][action.turbineID],
            (action.attribute2 ? [action.attribute1, action.attribute2] : [action.attribute1])
          ]
        }
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

    case DEL_TURBINE_FROM_GRAPH:
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

    case DEL_ATTRIBUTE_FROM_GRAPH:
      let attributeArray = action.attribute2 ? [action.attribute1, action.attribute2] : [action.attribute1];

      let filteredTurbine = state[action.hydraulicID][action.turbineID].filter((turbineObj, attribute) => {
        return !arrayAreEquals(attribute, attributeArray);
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
