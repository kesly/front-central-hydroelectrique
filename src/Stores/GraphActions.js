import { ADD_HYDRAULIC_TO_DATA, ADD_TURBINE_TO_DATA, ADD_ATTRIBUTE_TO_DATA } from "./DataActions";
import {
  addGraphToDataAndFetcher, delGraphFromFetcher,
  ADD_HYDRAULIC_TO_FETCHER, ADD_TURBINE_TO_FETCHER, ADD_ATTRIBUTE_TO_FETCHER
} from './DataFetcherActions';

export const ADD_HYDRAULIC_TO_GRAPH = "ADD_HYDRAULIC_TO_GRAPH";
export const ADD_ATTRIBUTE_TO_GRAPH = "ADD_ATTRIBUTE_TO_GRAPH";

export const DEL_HYDRAULIC_FROM_GRAPH = "DEL_HYDRAULIC_FROM_GRAPH";
export const DEL_ATTRIBUTE_FROM_GRAPH = "DEL_ATTRIBUTE_FROM_GRAPH";

export const TURBINES_COMMON_PROPERTIES = [ "high", "position" ];

export const addHydraulic = (hydraulicID, turbineID, attribute1, attribute2 = null) => ({
  type: ADD_HYDRAULIC_TO_GRAPH,
  hydraulicID,
  turbineID,
  attribute1,
  attribute2
});

export const addAttribute = (hydraulicID, turbineID, attribute1, attribute2 = null) => ({
  type: ADD_ATTRIBUTE_TO_GRAPH,
  hydraulicID,
  turbineID,
  attribute1,
  attribute2
});

export const delHydraulic = (hydraulicID) => ({
  type: DEL_HYDRAULIC_FROM_GRAPH,
  hydraulicID
});

export const delAttribute = (hydraulicID, turbineID, attribute1, attribute2 = null) => ({
  type: DEL_ATTRIBUTE_FROM_GRAPH,
  hydraulicID,
  turbineID,
  attribute1,
  attribute2
});

export function addGraph(graphs, data, dataFetcher, hydraulicID, turbineID, attribute1, attribute2 = null) {
  return (dispatch) => {
    let typesForData = {
      addHydraulic: ADD_HYDRAULIC_TO_DATA,
      addTurbine: ADD_TURBINE_TO_DATA,
      addAttribute: ADD_ATTRIBUTE_TO_DATA
    };

    let typesForDataFetcher = {
      addHydraulic: ADD_HYDRAULIC_TO_FETCHER,
      addTurbine: ADD_TURBINE_TO_FETCHER,
      addAttribute: ADD_ATTRIBUTE_TO_FETCHER
    };

    dispatch(addGraphToDataAndFetcher(typesForData, data, hydraulicID, turbineID, attribute1, attribute2));
    dispatch(addGraphToDataAndFetcher(typesForDataFetcher, dataFetcher, hydraulicID, turbineID, attribute1, attribute2));
    dispatch(addGraphToGraph(graphs, hydraulicID, turbineID, attribute1, attribute2));
  };
}

export function delGraph(graphs, dataFetcher, hydraulicID, turbineID, attribute1, attribute2 = null) {
  return (dispatch) => {
    dispatch(delGraphFromFetcher(dataFetcher, hydraulicID, turbineID, attribute1, attribute2));
    dispatch(delGraphFromGraph(graphs, hydraulicID, turbineID, attribute1, attribute2));
  };
}

export function addGraphToGraph(graphs, hydraulicID, turbineID, attribute1, attribute2 = null) {
  return (dispatch) => {
    // Si la centrale existe
    if (graphs.hasOwnProperty(hydraulicID)) {
      // Ajouter les attributs
      dispatch(addAttribute(hydraulicID, turbineID, attribute1, attribute2));
    }
    // Si la centrale n'existe pas
    else {
      // Ajouter la centrale
      dispatch(addHydraulic(hydraulicID, turbineID, attribute1, attribute2));
    }
  };
}

export function delGraphFromGraph(graphs, hydraulicID, turbineID, attribute1, attribute2 = null) {
  return (dispatch) => {
    // Si les attributs sont les seuls dans la centrale
    if (graphs[hydraulicID].length === 1) {
      // Supprimer la centrale
      dispatch(delHydraulic(hydraulicID));
    }
    // Si les attributs ne sont pas les seuls dans la centrale
    else {
      // Supprimer les attributs
      dispatch(delAttribute(hydraulicID, turbineID, attribute1, attribute2));
    }
  };
}
