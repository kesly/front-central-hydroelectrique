import { ADD_HYDRAULIC_TO_DATA, ADD_TURBINE_TO_DATA, ADD_ATTRIBUTE_TO_DATA } from "./DataActions";
import {
  addGraphToDataAndFetcher, delGraphFromFetcher,
  ADD_HYDRAULIC_TO_FETCHER, ADD_TURBINE_TO_FETCHER, ADD_ATTRIBUTE_TO_FETCHER
} from './DataFetcherActions';

export const ADD_HYDRAULIC_TO_GRAPH = "ADD_HYDRAULIC_TO_GRAPH";
export const ADD_TURBINE_TO_GRAPH = "ADD_TURBINE_TO_GRAPH";
export const ADD_ATTRIBUTE_TO_GRAPH = "ADD_ATTRIBUTE_TO_GRAPH";

export const DEL_HYDRAULIC_FROM_GRAPH = "DEL_HYDRAULIC_FROM_GRAPH";
export const DEL_TURBINE_FROM_GRAPH = "DEL_TURBINE_FROM_GRAPH";
export const DEL_ATTRIBUTE_FROM_GRAPH = "DEL_ATTRIBUTE_FROM_GRAPH";

export const addHydraulic = (hydraulicID, turbineID, attribute1, attribute2 = null) => ({
  type: ADD_HYDRAULIC_TO_GRAPH,
  hydraulicID,
  turbineID,
  attribute1,
  attribute2
});

export const addTurbine = (hydraulicID, turbineID, attribute1, attribute2 = null) => ({
  type: ADD_TURBINE_TO_GRAPH,
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

export const delTurbine = (hydraulicID, turbineID) => ({
  type: DEL_TURBINE_FROM_GRAPH,
  hydraulicID,
  turbineID
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
      // Si la turbine existe
      if (graphs.hasOwnProperty(turbineID)) {
        // Ajouter les attributs
        dispatch(addAttribute(hydraulicID, turbineID, attribute1, attribute2));
      }
      // Si la turbine n'existe pas
      else {
        // Ajouter la turbine
        dispatch(addTurbine(hydraulicID, turbineID, attribute1, attribute2));
      }
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
    // Si les attributs sont les seuls dans la turbine
    if (graphs[hydraulicID][turbineID].length === 1) {
      // Si la turbine est la seule dans la centrale
      if (Object.keys(graphs[hydraulicID]).length === 1) {
        // Supprimer la centrale
        dispatch(delHydraulic(hydraulicID));
      }
      // Si la turbine n'est pas la seule dans la centrale
      else {
        // Supprimer la turbine
        dispatch(delTurbine(hydraulicID, turbineID));
      }
    }
    // Si les attributs ne sont pas les seuls dans la turbine
    else {
      // Supprimer les attributs
      dispatch(delAttribute(hydraulicID, turbineID, attribute1, attribute2));
    }
  };
}
