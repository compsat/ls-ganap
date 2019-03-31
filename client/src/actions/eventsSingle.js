import axios from "axios";
import { normalize } from "normalizr";

import { addEntityEvents } from "actions/entities";
import { fetchHosts } from "actions/hosts";
import { fetchVenues } from "actions/venues";
import event from "entities/events";

export const FETCH_EVENTS_SINGLE_REQUEST = "FETCH_EVENTS_SINGLE_REQUEST";
export const fetchEventsSingleRequest = () => ({
  type: FETCH_EVENTS_SINGLE_REQUEST
});

export const FETCH_EVENTS_SINGLE_SUCCESS = "FETCH_EVENTS_SINGLE_SUCCESS";
export const fetchEventsSingleSuccess = event => ({
  type: FETCH_EVENTS_SINGLE_SUCCESS,
  event
});

export const FETCH_EVENTS_SINGLE_FAILURE = "FETCH_EVENTS_SINGLE_FAILURE";
export const fetchEventsSingleFailure = () => ({
  type: FETCH_EVENTS_SINGLE_FAILURE
});

export const fetchEventsSingle = id => {
  return dispatch => {
    dispatch(fetchHosts());
    dispatch(fetchVenues());
    dispatch(fetchEventsSingleRequest());

    return axios
      .get(`/events/${id}/`)
      .then(response => {
        const payload = response.data;
        const normalizedData = normalize({payload}, [event]);
        dispatch(addEntityEvents(normalizedData.entities.events));
        dispatch(fetchEventsSingleSuccess(normalizedData.result));
      })
      .catch(error => {
        dispatch(fetchEventsSingleFailure());
      });
  };
};
