import axios from "axios";
import { normalize } from "normalizr";

import { addEntityTags } from "actions/entities";
import tag from "entities/tags";

export const FETCH_TAGS_REQUEST = "FETCH_TAGS_REQUEST";
export const fetchTagsRequest = () => ({
  type: FETCH_TAGS_REQUEST
});

export const FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS";
export const fetchTagsSuccess = tags => ({
  type: FETCH_TAGS_SUCCESS,
  tags
});

export const FETCH_TAGS_FAILURE = "FETCH_TAGS_FAILURE";
export const fetchTagsFailure = () => ({
  type: FETCH_TAGS_FAILURE
});

export const fetchTags = () => {
  return (dispatch, getState) => {
    const {
      domainData: { tags }
    } = getState();

    if (!tags.hasInitiatedFetch || tags.failedToFetch) {
      dispatch(fetchTagsRequest());

      return axios
        .get("/tags")
        .then(response => {
          const payload = response.data.results;
          const normalizedData = normalize(payload, [tag]);

          dispatch(addEntityTags(normalizedData.entities.tags));
          dispatch(fetchTagsSuccess(normalizedData.result));
        })
        .catch(error => {
          dispatch(fetchTagsFailure());
        });
    }
  };
};
