import axios from "axios";

import { fetchClusters } from "actions/clusters";
import { fetchOrgTypes } from "actions/orgTypes";

export const FETCH_HOSTS_REQUEST = "FETCH_HOSTS_REQUEST";
export const fetchHostsRequest = () => ({
  type: FETCH_HOSTS_REQUEST
});

export const FETCH_HOSTS_SUCCESS = "FETCH_HOSTS_SUCCESS";
export const fetchHostsSuccess = ({ orgHosts, sangguHosts, officeHosts }) => ({
  type: FETCH_HOSTS_SUCCESS,
  orgHosts,
  sangguHosts,
  officeHosts
});

export const FETCH_HOSTS_FAILURE = "FETCH_HOSTS_FAILURE";
export const fetchHostsFailure = () => ({
  type: FETCH_HOSTS_FAILURE
});

export const fetchHosts = () => {
  return dispatch => {
    dispatch(fetchOrgTypes());
    dispatch(fetchClusters());
    dispatch(fetchHostsRequest());

    return axios
      .get("/event_hosts/1")
      .then(response => {
        dispatch(
          fetchHostsSuccess({
            orgHosts: response.data.org_list,
            sangguHosts: response.data.sanggu_list,
            officeHosts: response.data.office_list
          })
        );
      })
      .catch(error => {
        dispatch(fetchHostsFailure());
      });
  };
};
