import axios from "axios";

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
  return dispatch => {
    dispatch(fetchTagsRequest());

    return axios
      .get("/tags")
      .then(response => {
        dispatch(fetchTagsSuccess(response.data.results));
      })
      .catch(error => {
        dispatch(fetchTagsFailure());
      });
  };
};
