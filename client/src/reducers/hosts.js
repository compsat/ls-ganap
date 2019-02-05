import {
  FETCH_HOSTS_REQUEST,
  FETCH_HOSTS_SUCCESS,
  FETCH_HOSTS_FAILURE
} from "../actions/hosts";

const hosts = (
  state = {
    isFetching: false,
    failedToFetch: false,
    event_hosts: [],
    clusters: [],
    org_types: [],
    items: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_HOSTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_HOSTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        event_hosts: action.event_host_types,
        clusters: action.clusters,
        org_types: action.org_types,
        items: [
          ...mixInProps(action.event_hosts.sanggu_list, {
            event_host: 0
          }),
          ...mixInProps(action.event_hosts.office_list, {
            event_host: 1
          }),
          ...mixInProps(action.event_hosts.org_list, {
            event_host: 2
          })
        ]
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

const mixInProps = (objArray, props) => {
  return objArray.map(obj => ({
    ...obj,
    ...props,
    active: false
  }));
};

export default hosts;
