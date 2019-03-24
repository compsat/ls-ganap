import axios from "axios";
import { normalize } from "normalizr";

import { addEntityVenues } from "actions/entities";
import venue from "entities/venues";

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
  return (dispatch, getState) => {
    const {
      domainData: { venues }
    } = getState();

    if (!venues.hasInitiatedFetch || venue.failedToFetch) {
      dispatch(fetchVenuesRequest());

      return axios
        .get("/venues")
        .then(response => {
          const payload = response.data.results;
          const normalizedData = normalize(payload, [venue]);

          dispatch(addEntityVenues(normalizedData.entities.venues));
          dispatch(fetchVenuesSuccess(normalizedData.result));
        })
        .catch(error => {
          dispatch(fetchVenuesFailure());
        });
    }
  };
};
