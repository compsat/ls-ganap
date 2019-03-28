import axios from "axios";
import { normalize } from "normalizr";

import { addEntityEvents } from "actions/entities";
import { fetchHosts } from "actions/hosts";
import { fetchVenues } from "actions/venues";
import event from "entities/events";

export const FETCH_EVENTS_PENDING_REQUEST = "FETCH_EVENTS_PENDING_REQUEST";
export const fetchEventsPendingRequest = () => ({
  type: FETCH_EVENTS_PENDING_REQUEST
});

export const FETCH_EVENTS_PENDING_SUCCESS = "FETCH_EVENTS_PENDING_SUCCESS";
export const fetchEventsPendingSuccess = events => ({
  type: FETCH_EVENTS_PENDING_SUCCESS,
  events
});

export const FETCH_EVENTS_PENDING_FAILURE = "FETCH_EVENTS_PENDING_FAILURE";
export const fetchEventsPendingFailure = () => ({
  type: FETCH_EVENTS_PENDING_FAILURE
});

export const fetchEventsPending = () => {
  return dispatch => {
    dispatch(fetchHosts());
    dispatch(fetchVenues());
    dispatch(fetchEventsPendingRequest());

    return axios
      .get("/events/unapproved")
      .then(response => {
        const payload = response.data;
        const normalizedData = normalize(payload, [event]);

        dispatch(addEntityEvents(normalizedData.entities.events));
        dispatch(fetchEventsPendingSuccess(normalizedData.result));
      })
      .catch(error => {
        dispatch(fetchEventsPendingFailure());
      });
  };
};
