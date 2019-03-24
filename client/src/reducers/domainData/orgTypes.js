import {
  FETCH_ORG_TYPES_REQUEST,
  FETCH_ORG_TYPES_SUCCESS,
  FETCH_ORG_TYPES_FAILURE
} from "actions/orgTypes";

const orgTypes = (
  state = {
    hasInitiatedFetch: false,
    isFetching: false,
    failedToFetch: false,
    result: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_ORG_TYPES_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedFetch: true,
        isFetching: true
      });
    case FETCH_ORG_TYPES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        result: action.orgTypes
      });
    case FETCH_ORG_TYPES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        failedToFetch: true
      });
    default:
      return state;
  }
};

export default orgTypes;
