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

export const POST_TAG_REQUEST = "POST_TAG_REQUEST";
export const postTagRequest = () => ({
  type: POST_TAG_REQUEST
});

export const POST_TAG_SUCCESS = "POST_TAG_SUCCESS";
export const postTagSuccess = (tag) => ({
  type: POST_TAG_SUCCESS,
  tag
});

export const POST_TAG_FAILURE = "POST_TAG_FAILURE";
export const postTagFailure = () => ({
  type: POST_TAG_FAILURE
});

export const postTag = (tag) => {
  return dispatch => {
    dispatch(postTagRequest());

    return axios
      .post("/tags/", {
        name: tag
      })
      .then(response => {
        const tagId = response.data.id;
        const currentTags = localStorage.getItem("tags");
        if(currentTags != null) {
          localStorage.setItem("tags", [...currentTags, tagId]);
        }
        else {
          localStorage.setItem("tags", [tagId]);
        }

        dispatch(postTagSuccess(tagId));
      })
      .catch(error => {
        dispatch(postTagFailure());
      });
  };
};