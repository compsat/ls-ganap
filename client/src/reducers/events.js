import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE
} from "../actions/events";

const events = (
  state = {
    isFetching: false,
    failedToFetch: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.events
      });
    case FETCH_EVENTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        failedToFetch: true
      });
    default:
      return state;
  }
};

export default events;
