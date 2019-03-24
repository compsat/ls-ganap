import {
  FETCH_EVENTS_FEATURED_REQUEST,
  FETCH_EVENTS_FEATURED_SUCCESS,
  FETCH_EVENTS_FEATURED_FAILURE
} from "actions/eventsFeatured";

const eventsFeatured = (
  state = {
    hasInitiatedFetch: false,
    isFetching: false,
    failedToFetch: false,
    result: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_EVENTS_FEATURED_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedFetch: true,
        isFetching: true
      });
    case FETCH_EVENTS_FEATURED_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        result: action.events
      });
    case FETCH_EVENTS_FEATURED_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        failedToFetch: true
      });
    default:
      return state;
  }
};

export default eventsFeatured;
