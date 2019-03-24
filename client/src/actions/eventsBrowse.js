import axios from "axios";
import { normalize } from "normalizr";
import queryString from "query-string";

import { addEntityEvents } from "actions/entities";
import { fetchHosts } from "actions/hosts";
import { fetchVenues } from "actions/venues";
import event from "entities/events";

export const FETCH_EVENTS_BROWSE_REQUEST = "FETCH_EVENTS_BROWSE_REQUEST";
export const fetchEventsBrowseRequest = () => ({
  type: FETCH_EVENTS_BROWSE_REQUEST
});

export const FETCH_EVENTS_BROWSE_SUCCESS = "FETCH_EVENTS_BROWSE_SUCCESS";
export const fetchEventsBrowseSuccess = ({ page, events }) => ({
  type: FETCH_EVENTS_BROWSE_SUCCESS,
  page,
  events
});

export const FETCH_EVENTS_BROWSE_FAILURE = "FETCH_EVENTS_BROWSE_FAILURE";
export const fetchEventsBrowseFailure = () => ({
  type: FETCH_EVENTS_BROWSE_FAILURE
});

export const fetchEventsBrowse = (params = {}) => {
  return dispatch => {
    dispatch(fetchHosts());
    dispatch(fetchVenues());
    dispatch(fetchEventsBrowseRequest());

    return axios
      .get("/events?" + queryString.stringify(params))
      .then(response => {
        const payload = response.data.results;
        const normalizedData = normalize(payload, [event]);

        dispatch(addEntityEvents(normalizedData.entities.events));
        dispatch(
          fetchEventsBrowseSuccess({
            page: params.page || 1,
            events: normalizedData.result
          })
        );
      })
      .catch(error => {
        dispatch(fetchEventsBrowseFailure());
      });
  };
};
