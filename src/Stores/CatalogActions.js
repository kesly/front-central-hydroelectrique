export const FETCH_CATALOG_BEGIN   = 'FETCH_CATALOG_BEGIN';
export const FETCH_CATALOG_SUCCESS = 'FETCH_CATALOG_SUCCESS';
export const FETCH_CATALOG_ERROR = 'FETCH_CATALOG_ERROR';

export const fetchCatalogBegin = () => ({
  type: FETCH_CATALOG_BEGIN
});

export const fetchCatalogSuccess = (data) => ({
  type: FETCH_CATALOG_SUCCESS,
  catalog: { data }
});

export const fetchCatalogError = (error) => ({
  type: FETCH_CATALOG_ERROR,
  catalog: { error }
});

export function fetchCatalog() {
  return (dispatch) => {
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
