import {
  FETCH_EVENTS_BROWSE_REQUEST,
  FETCH_EVENTS_BROWSE_SUCCESS,
  FETCH_EVENTS_BROWSE_FAILURE
} from "actions/eventsBrowse";

const eventsBrowse = (
  state = {
    hasInitiatedFetch: false,
    isFetching: false,
    failedToFetch: false,
    result: [],
    page: 1
  },
  action
) => {
  switch (action.type) {
    case FETCH_EVENTS_BROWSE_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedFetch: true,
        isFetching: true
      });
    case FETCH_EVENTS_BROWSE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        result:
          action.page === 1
            ? [...action.events]
            : [...state.result, ...action.events],
        page: action.page
      });
    case FETCH_EVENTS_BROWSE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        failedToFetch: true
      });
    default:
      return state;
  }
};

export default eventsBrowse;
