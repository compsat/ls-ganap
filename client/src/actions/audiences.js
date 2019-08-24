import axios from "axios";

import { addEntityAudience } from "actions/entities";
import audience from "entities/audiences";

export const FETCH_AUDIENCE_REQUEST = "FETCH_AUDIENCE_REQUEST";
export const fetchAudienceRequest = () => ({
  type: FETCH_AUDIENCE_REQUEST
});

export const FETCH_AUDIENCE_SUCCESS = "FETCH_AUDIENCE_SUCCESS";
export const fetchAudienceSuccess = audience => ({
  type: FETCH_AUDIENCE_SUCCESS,
  audience
});

export const FETCH_AUDIENCE_FAILURE = "FETCH_AUDIENCE_FAILURE";
export const fetchAudienceFailure = () => ({
  type: FETCH_AUDIENCE_FAILURE
});

export const fetchAudiences = () => {
  return (dispatch, getState) => {
    const {
      domainData: { audiences }
    } = getState();

    if (!audience.hasInitiatedFetch || audience.failedToFetch) {
      dispatch(fetchAudienceRequest());

      return axios
        .get("/audiences/")
        .then(response => {
          const payload = response.data;

          dispatch(addEntityAudience(payload));
          dispatch(fetchAudienceSuccess(payload));
        })
        .catch(error => {
          console.log(error);
          dispatch(fetchAudienceFailure());
        });
    }
  };
};
