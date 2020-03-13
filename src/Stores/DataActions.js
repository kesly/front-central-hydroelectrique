export const ADD_GRAPH = "ADD_GRAPH";

export const DEL_HYDRAULIC = "DEL_HYDRAULIC";
export const DEL_TURBINE = "DEL_TURBINE";

export const FETCH_DATA_BEGIN = "FETCH_DATA_BEGIN";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR = "FETCH_DATA_ERROR";

export const delHydraulic = (hydraulicID) => ({
  type: DEL_HYDRAULIC,
  hydraulicID
});

export const delTurbine = (hydraulicID, turbineID) => ({
  type: DEL_TURBINE,
  hydraulicID,
  turbineID
});

export const addGraph = (hydraulicID, turbineID) => ({
  type: ADD_GRAPH,
  hydraulicID,
  turbineID
});

export const fetchDataBegin = (hydraulicID, turbineID, attribute) => ({
  type: FETCH_DATA_BEGIN,
  hydraulicID,
  turbineID,
  attribute
});

export const fetchDataSuccess = (hydraulicID, turbineID, attribute, data) => ({
  type: FETCH_DATA_SUCCESS,
  hydraulicID,
  turbineID,
  attribute,
  data: { data }
});

export const fetchDataError = (hydraulicID, turbineID, attribute, error) => ({
  type: FETCH_DATA_ERROR,
  hydraulicID,
  turbineID,
  attribute,
  data: { error }
});

export function fetchData(hydraulicID, turbineID, attribute, lastData) {

  let valideAttribute;

  switch (attribute) {
    case "Debit1": valideAttribute = "debit";
    case "Debit2": valideAttribute = "debit";
    case "Puissance1": valideAttribute = "power";
    case "Puissance1": valideAttribute = "power";
    case "Elevation": valideAttribute = "high";
    default: valideAttribute = "debit";
  }

  return (dispatch) => {
    dispatch(fetchDataBegin(hydraulicID, turbineID, valideAttribute));
    return fetch(`/test-data?hydraulicID=${hydraulicID}&turbineID=${turbineID}&attribute=${attribute}&begin=${lastData}&end=${lastData + 1}`)
      .then((res) => { return res.json() })
      .then((json) => {
        dispatch(fetchDataSuccess(hydraulicID, turbineID, valideAttribute, json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchDataError(hydraulicID, turbineID, valideAttribute, error)));
  };
}
