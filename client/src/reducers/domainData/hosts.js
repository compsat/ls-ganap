import {
  FETCH_HOSTS_REQUEST,
  FETCH_HOSTS_SUCCESS,
  FETCH_HOSTS_FAILURE
} from "actions/hosts";

const hosts = (
  state = {
    hasInitiatedFetch: false,
    isFetching: false,
    failedToFetch: false,
    officeHosts: [],
    orgHosts: [],
    sangguHosts: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_HOSTS_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedFetch: true,
        isFetching: true
      });
    case FETCH_HOSTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        officeHosts: action.officeHosts,
        orgHosts: action.orgHosts,
        sangguHosts: action.sangguHosts
      });
    case FETCH_HOSTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        failedToFetch: true
      });
    default:
      return state;
  }
};

export default hosts;
