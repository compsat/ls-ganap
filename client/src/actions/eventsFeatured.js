import axios from "axios";
import { normalize } from "normalizr";

import { addEntityEvents } from "actions/entities";
import { fetchHosts } from "actions/hosts";
import { fetchVenues } from "actions/venues";
import event from "entities/events";

export const FETCH_EVENTS_FEATURED_REQUEST = "FETCH_EVENTS_FEATURED_REQUEST";
export const fetchEventsFeaturedRequest = () => ({
  type: FETCH_EVENTS_FEATURED_REQUEST
});

export const FETCH_EVENTS_FEATURED_SUCCESS = "FETCH_EVENTS_FEATURED_SUCCESS";
export const fetchEventsFeaturedSuccess = events => ({
  type: FETCH_EVENTS_FEATURED_SUCCESS,
  events
});

export const FETCH_EVENTS_FEATURED_FAILURE = "FETCH_EVENTS_FEATURED_FAILURE";
export const fetchEventsFeaturedFailure = () => ({
  type: FETCH_EVENTS_FEATURED_FAILURE
});

export const fetchEventsFeatured = () => {
  return dispatch => {
    dispatch(fetchHosts());
    dispatch(fetchVenues());
    dispatch(fetchEventsFeaturedRequest());

    return axios
      .get("/events/featured/")
      .then(response => {
        const payload = response.data.results;
        const normalizedData = normalize(payload, [event]);

        dispatch(addEntityEvents(normalizedData.entities.events));
        dispatch(fetchEventsFeaturedSuccess(normalizedData.result));
      })
      .catch(error => {
        dispatch(fetchEventsFeaturedFailure());
      });
  };
};
