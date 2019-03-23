import {
  FETCH_EVENTS_APPROVED_REQUEST,
  FETCH_EVENTS_APPROVED_SUCCESS,
  FETCH_EVENTS_APPROVED_FAILURE
} from "actions/eventsApproved";

const eventsApproved = (
  state = {
    hasInitiatedFetch: false,
    isFetching: false,
    failedToFetch: false,
    result: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_EVENTS_APPROVED_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedFetch: true,
        isFetching: true
      });
    case FETCH_EVENTS_APPROVED_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        result: action.events
      });
    case FETCH_EVENTS_APPROVED_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        failedToFetch: true
      });
    default:
      return state;
  }
};

export default eventsApproved;
