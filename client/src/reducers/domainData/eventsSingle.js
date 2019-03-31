import {
  FETCH_EVENTS_SINGLE_REQUEST,
  FETCH_EVENTS_SINGLE_SUCCESS,
  FETCH_EVENTS_SINGLE_FAILURE
} from "actions/eventsSingle";

const eventsSingle = (
  state = {
    hasInitiatedFetch: false,
    isFetching: false,
    failedToFetch: false,
    result: null,
  },
  action
) => {
  switch (action.type) {
    case FETCH_EVENTS_SINGLE_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedFetch: true,
        isFetching: true
      });
    case FETCH_EVENTS_SINGLE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        result: action.event
      });
    case FETCH_EVENTS_SINGLE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        failedToFetch: true
      });
    default:
      return state;
  }
};

export default eventsSingle;
