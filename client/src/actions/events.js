import axios from "axios";
import queryString from "query-string";

export const FETCH_EVENTS_REQUEST = "FETCH_EVENTS_REQUEST";
export const fetchEventsRequest = () => ({
  type: FETCH_EVENTS_REQUEST
});

export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const fetchEventsSuccess = (page, events) => ({
  type: FETCH_EVENTS_SUCCESS,
  page,
  events
});

export const FETCH_EVENTS_FAILURE = "FETCH_EVENTS_FAILURE";
export const fetchEventsFailure = () => ({
  type: FETCH_EVENTS_FAILURE
});

export const fetchEvents = params => {
  return dispatch => {
    dispatch(fetchEventsRequest());

    return axios
      .get("/events?" + queryString.stringify(params))
      .then(response => {
        dispatch(fetchEventsSuccess(params.page || 1, response.data.results));
      })
      .catch(error => {
        dispatch(fetchEventsFailure());
      });
  };
};
