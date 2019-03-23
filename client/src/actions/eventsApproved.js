import axios from "axios";
import { normalize } from "normalizr";

import { addEntityEvents } from "actions/entities";
import { fetchHosts } from "actions/hosts";
import { fetchVenues } from "actions/venues";
import event from "entities/events";

export const FETCH_EVENTS_APPROVED_REQUEST = "FETCH_EVENTS_APPROVED_REQUEST";
export const fetchEventsApprovedRequest = () => ({
  type: FETCH_EVENTS_APPROVED_REQUEST
});

export const FETCH_EVENTS_APPROVED_SUCCESS = "FETCH_EVENTS_APPROVED_SUCCESS";
export const fetchEventsApprovedSuccess = events => ({
  type: FETCH_EVENTS_APPROVED_SUCCESS,
  events
});

export const FETCH_EVENTS_APPROVED_FAILURE = "FETCH_EVENTS_APPROVED_FAILURE";
export const fetchEventsApprovedFailure = () => ({
  type: FETCH_EVENTS_APPROVED_FAILURE
});

export const fetchEventsApproved = userId => {
  return dispatch => {
    dispatch(fetchHosts());
    dispatch(fetchVenues());
    dispatch(fetchEventsApprovedRequest());

    return axios
      .get("/events/?host=" + userId)
      .then(response => {
        const payload = response.data.results;
        const normalizedData = normalize(payload, [event]);

        dispatch(addEntityEvents(normalizedData.entities.events));
        dispatch(fetchEventsApprovedSuccess(normalizedData.result));
      })
      .catch(error => {
        dispatch(fetchEventsApprovedFailure());
      });
  };
};
