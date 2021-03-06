import axios from "axios";
import { normalize } from "normalizr";
import { format, addDays } from "date-fns";

import { addEntityEvents } from "actions/entities";
import { fetchHosts } from "actions/hosts";
import { fetchVenues } from "actions/venues";
import event from "entities/events";

export const FETCH_EVENTS_UPCOMING_REQUEST = "FETCH_EVENTS_UPCOMING_REQUEST";
export const fetchEventsUpcomingRequest = () => ({
  type: FETCH_EVENTS_UPCOMING_REQUEST
});

export const FETCH_EVENTS_UPCOMING_SUCCESS = "FETCH_EVENTS_UPCOMING_SUCCESS";
export const fetchEventsUpcomingSuccess = events => ({
  type: FETCH_EVENTS_UPCOMING_SUCCESS,
  events
});

export const FETCH_EVENTS_UPCOMING_FAILURE = "FETCH_EVENTS_UPCOMING_FAILURE";
export const fetchEventsUpcomingFailure = () => ({
  type: FETCH_EVENTS_UPCOMING_FAILURE
});

export const fetchEventsUpcoming = () => {
  return dispatch => {
    dispatch(fetchHosts());
    dispatch(fetchVenues());
    dispatch(fetchEventsUpcomingRequest());

    const today = format(new Date(), "YYYY-MM-DD");
    const last_date = format(addDays(today, 7), "YYYY-MM-DD");

    return axios
      .get(`/events/?start_date=${today}&end_date=${last_date}`)
      .then(response => {
        const payload = response.data.results.slice(0, 12);
        const normalizedData = normalize(payload, [event]);

        dispatch(addEntityEvents(normalizedData.entities.events));
        dispatch(fetchEventsUpcomingSuccess(normalizedData.result));
      })
      .catch(error => {
        dispatch(fetchEventsUpcomingFailure());
      });
  };
};
