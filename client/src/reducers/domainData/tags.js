import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  POST_TAG_REQUEST,
  POST_TAG_SUCCESS,
  POST_TAG_FAILURE
} from "actions/tags";

const tags = (
  state = {
    hasInitiatedFetch: false,
    isFetching: false,
    failedToFetch: false,
    hasInitiatedPost: false,
    isPosting: false,
    failedToPost: false,
    result: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_TAGS_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedFetch: true,
        isFetching: true
      });
    case FETCH_TAGS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        result: action.tags
      });
    case FETCH_TAGS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        failedToFetch: true
      });
    case POST_TAG_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedPost: true,
        isPosting: true
      });
    case POST_TAG_SUCCESS:
      return Object.assign({}, state, {
        isPosting: false,
        result: action.tag
      });
    case POST_TAG_FAILURE:
      return Object.assign({}, state, {
        isPosting: false,
        failedToPost: true
      });
    default:
      return state;
  }
};

export default tags;
