import {
  FETCH_AUDIENCE_REQUEST,
  FETCH_AUDIENCE_SUCCESS,
  FETCH_AUDIENCE_FAILURE
} from "actions/audiences";

const tags = (
  state = {
    hasInitiatedFetch: false,
    isFetching: false,
    failedToFetch: false,
    result: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_AUDIENCE_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedFetch: true,
        isFetching: true
      });
    case FETCH_AUDIENCE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        result: action.audiences
      });
    case FETCH_AUDIENCE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        failedToFetch: true
      });
    default:
      return state;
  }
};

export default audiences;
