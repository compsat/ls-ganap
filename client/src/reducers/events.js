import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE
} from "actions/events";

const events = (
  state = {
    hasInitiatedFetch: false,
    isFetching: false,
    failedToFetch: false,
    items: [],
    page: 1
  },
  action
) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedFetch: true,
        isFetching: true
      });
    case FETCH_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items:
          action.page === 1
            ? action.events.reduce((item, event) => {
                return Object.assign(item, {
                  [event.id]: event
                });
              }, {})
            : {
                ...state.items,
                ...action.events.reduce((item, event) => {
                  return Object.assign(item, {
                    [event.id]: event
                  });
                }, {})
              },
        page: action.page
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
