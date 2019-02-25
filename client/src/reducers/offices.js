import {
  FETCH_OFFICES_REQUEST,
  FETCH_OFFICES_SUCCESS,
  FETCH_OFFICES_FAILURE
} from "actions/offices";

const offices = (
  state = {
    hasInitiatedFetch: false,
    isFetching: false,
    failedToFetch: false,
    items: [],
    page: 0
  },
  action
) => {
  switch (action.type) {
    case FETCH_OFFICES_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedFetch: true,
        isFetching: true
      });
    case FETCH_OFFICES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items:
          action.page === 1
            ? action.offices.reduce((item, office) => {
                return Object.assign(item, {
                  [office.id]: office
                });
              }, {})
            : {
                ...state.items,
                ...action.offices.reduce((item, office) => {
                  return Object.assign(item, {
                    [office.id]: office
                  });
                }, {})
              },
        page: action.page
      });
    case FETCH_OFFICES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        failedToFetch: true
      });
    default:
      return state;
  }
};

export default offices;
