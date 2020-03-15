export const ADD_HYDRAULIC_TO_DATA = "ADD_HYDRAULIC_TO_DATA";
export const ADD_TURBINE_TO_DATA = "ADD_TURBINE_TO_DATA";
export const ADD_ATTRIBUTE_TO_DATA = "ADD_ATTRIBUTE_TO_DATA";

export const FETCH_DATA_BEGIN = "FETCH_DATA_BEGIN";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR = "FETCH_DATA_ERROR";

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

  const attributeForURL = {
    debit: "Debit1",
    power: "Puissance1",
    high: "Elevation"
  }

  return (dispatch) => {
    dispatch(fetchDataBegin(hydraulicID, turbineID, attribute));
    return fetch(`/test-data?hydraulicID=${hydraulicID}&turbineID=${turbineID}&attribute=${attributeForURL[attribute]}&begin=${lastData}&end=${lastData + 1}`)
      .then((res) => { return res.json() })
      .then((json) => {
        dispatch(fetchDataSuccess(hydraulicID, turbineID, attribute, json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchDataError(hydraulicID, turbineID, attribute, error)));
  };
}