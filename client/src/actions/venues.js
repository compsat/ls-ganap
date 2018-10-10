import axios from "axios";

export const FETCH_VENUES_REQUEST = "FETCH_VENUES_REQUEST";
export const fetchVenuesRequest = () => ({
  type: FETCH_VENUES_REQUEST
});

export const FETCH_VENUES_SUCCESS = "FETCH_VENUES_SUCCESS";
export const fetchVenuesSuccess = venues => ({
  type: FETCH_VENUES_SUCCESS,
  venues
});

export const FETCH_VENUES_FAILURE = "FETCH_VENUES_FAILURE";
export const fetchVenuesFailure = () => ({
  type: FETCH_VENUES_FAILURE
});

export const fetchVenues = () => {
  return dispatch => {
    dispatch(fetchVenuesRequest());

    return axios
      .get(process.env.REACT_APP_API_URL + "/venues")
      .then(response => {
        dispatch(fetchVenuesSuccess(response.data.results));
      })
      .catch(error => {
        dispatch(fetchVenuesFailure());
      });
  };
};
