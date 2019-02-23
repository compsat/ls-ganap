import {
  FETCH_VENUES_REQUEST,
  FETCH_VENUES_SUCCESS,
  FETCH_VENUES_FAILURE
} from "actions/venues";

const venues = (
  state = {
    isFetching: false,
    failedToFetch: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_VENUES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_VENUES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.venues
      });
    case FETCH_VENUES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        failedToFetch: true
      });
    default:
      return state;
  }
};

export default venues;
