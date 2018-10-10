import axios from "axios";

export const TOGGLE_TAG = "TOGGLE_TAG";
export const toggleTag = tagId => ({
  type: TOGGLE_TAG,
  id: tagId
});

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
      .get(process.env.REACT_APP_API_URL + "/tags")
      .then(response => {
        dispatch(fetchTagsSuccess(response.data.results));
      })
      .catch(error => {
        dispatch(fetchTagsFailure());
      });
  };
};
