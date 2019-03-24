import {
  FETCH_EVENTS_UPCOMING_REQUEST,
  FETCH_EVENTS_UPCOMING_SUCCESS,
  FETCH_EVENTS_UPCOMING_FAILURE
} from "actions/eventsUpcoming";

const eventsUpcoming = (
  state = {
    hasInitiatedFetch: false,
    isFetching: false,
    failedToFetch: false,
    result: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_EVENTS_UPCOMING_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedFetch: true,
        isFetching: true
      });
    case FETCH_EVENTS_UPCOMING_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        result: action.events
      });
    case FETCH_EVENTS_UPCOMING_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        failedToFetch: true
      });
    default:
      return state;
  }
};

export default eventsUpcoming;
