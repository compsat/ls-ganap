import axios from "axios";
import queryString from "query-string";

export const FETCH_OFFICES_REQUEST = "FETCH_OFFICES_REQUEST";
export const fetchOfficesRequest = () => ({
  type: FETCH_OFFICES_REQUEST
});

export const FETCH_OFFICES_SUCCESS = "FETCH_OFFICES_SUCCESS";
export const fetchOfficesSuccess = (offices, page) => ({
  type: FETCH_OFFICES_SUCCESS,
  offices,
  page
});

export const FETCH_OFFICES_FAILURE = "FETCH_OFFICES_FAILURE";
export const fetchOfficesFailure = () => ({
  type: FETCH_OFFICES_FAILURE
});

export const fetchOffices = page => {
  return dispatch => {
    dispatch(fetchOfficesRequest());

    return axios
      .get("/offices?" + queryString.stringify({ page }))
      .then(response => {
        dispatch(fetchOfficesSuccess(response.data.results, page));
      })
      .catch(error => {
        dispatch(fetchOfficesFailure());
      });
  };
};
