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
    sangguHosts: [],
    officeHosts: [],
    orgHosts: []
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
        orgHosts: action.orgHosts.reduce((item, orgHost) => {
          return Object.assign(item, {
            [orgHost.id]: orgHost
          });
        }, {}),
        sangguHosts: action.sangguHosts.reduce((item, sangguHost) => {
          return Object.assign(item, {
            [sangguHost.id]: sangguHost
          });
        }, {}),
        officeHosts: action.officeHosts.reduce((item, officeHost) => {
          return Object.assign(item, {
            [officeHost.id]: officeHost
          });
        }, {})
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
