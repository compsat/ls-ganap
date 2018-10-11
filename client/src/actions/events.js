import axios from "axios";

export const FETCH_EVENTS_REQUEST = "FETCH_EVENTS_REQUEST";
export const fetchEventsRequest = () => ({
  type: FETCH_EVENTS_REQUEST
});

export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const fetchEventsSuccess = events => ({
  type: FETCH_EVENTS_SUCCESS,
  events
});

export const FETCH_EVENTS_FAILURE = "FETCH_EVENTS_FAILURE";
export const fetchEventsFailure = () => ({
  type: FETCH_EVENTS_FAILURE
});

export const fetchEvents = () => {
  return dispatch => {
    dispatch(fetchEventsRequest());

    return axios
      .get(process.env.REACT_APP_API_URL + "/events")
      .then(response => {
        dispatch(fetchEventsSuccess(response.data.results));
      })
      .catch(error => {
        dispatch(fetchEventsFailure());
      });
  };
};
