import axios from "axios";

export const FETCH_HOSTS_REQUEST = "FETCH_HOSTS_REQUEST";
export const fetchHostsRequest = () => ({
  type: FETCH_HOSTS_REQUEST
});

export const FETCH_HOSTS_SUCCESS = "FETCH_HOSTS_SUCCESS";
export const fetchHostsSuccess = (
  event_host_types,
  clusters,
  org_types,
  event_hosts
) => ({
  type: FETCH_HOSTS_SUCCESS,
  event_host_types,
  clusters,
  org_types,
  event_hosts
});

export const FETCH_HOSTS_FAILURE = "FETCH_HOSTS_FAILURE";
export const fetchHostsFailure = () => ({
  type: FETCH_HOSTS_FAILURE
});

export const fetchHosts = () => {
  return dispatch => {
    dispatch(fetchHostsRequest());

    return axios
      .all([
        axios.get("/clusters"),
        axios.get("/org_types"),
        axios.get("/event_hosts/1")
      ])
      .then(axios.spread((clusters, org_types, event_hosts) => {
        dispatch(fetchHostsSuccess(
          [
            {
              id: 0,
              name: "Sanggunian"
            },
            {
              id: 1,
              name: "Offices"
            },
            {
              id: 2,
              name: "Student Organizations"
            }
          ],
          clusters.data.results,
          org_types.data.results,
          event_hosts.data
        ));
      }))
      .catch(error => {
        dispatch(fetchHostsFailure());
      });
  };
};
