export const FETCH_CATALOG_BEGIN   = 'FETCH_CATALOG_BEGIN';
export const FETCH_CATALOG_SUCCESS = 'FETCH_CATALOG_SUCCESS';
export const FETCH_CATALOG_ERROR = 'FETCH_CATALOG_ERROR';
export const ADD_HYDRAULIC = "ADD_HYDRAULIC";
// export const DEL_HYDRAULIC = "DEL_HYDRAULIC";
export const ADD_TURBINE = "ADD_TURBINE";
// export const DEL_HYDRAULIC = "DEL_TURBINE";

export const fetchCatalogBegin = () => ({
  type: FETCH_CATALOG_BEGIN
});

export const fetchCatalogSuccess = (data) => ({
  type: FETCH_CATALOG_SUCCESS,
  hydraulicsID: { data }
});

export const fetchCatalogError = (error) => ({
  type: FETCH_CATALOG_ERROR,
  hydraulicsID: { error }
});

export function fetchCatalog() {
  return async (dispatch) => {
    dispatch(fetchCatalogBegin());
    return fetch("/hydraulics")
      .then((res) => { return res.json() })
      .then((json) => {
        dispatch(fetchCatalogSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchCatalogError(error)));
  };
}

// export const addHydraulic = (hydraulicID) => ({
//   type: ADD_HYDRAULIC,
//   hydraulicID: hydraulicID
// });
//
// export const addTurbine = (hydraulicID, turbineID) => ({
//   type: ADD_TURBINE,
//   hydraulicID: hydraulicID,
//   turbineID: turbineID
// });
