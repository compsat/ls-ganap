import {
  FETCH_EVENTS_PENDING_REQUEST,
  FETCH_EVENTS_PENDING_SUCCESS,
  FETCH_EVENTS_PENDING_FAILURE
} from "actions/eventsPending";

const eventsPending = (
  state = {
    hasInitiatedFetch: false,
    isFetching: false,
    failedToFetch: false,
    result: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_EVENTS_PENDING_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedFetch: true,
        isFetching: true
      });
    case FETCH_EVENTS_PENDING_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        result: action.events
      });
    case FETCH_EVENTS_PENDING_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        failedToFetch: true
      });
    default:
      return state;
  }
};

export default eventsPending;
