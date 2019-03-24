import axios from "axios";
import { normalize } from "normalizr";

import { fetchClusters } from "actions/clusters";
import {
  addEntityOffices,
  addEntityOrgs,
  addEntitySanggu
} from "actions/entities";
import { fetchOrgTypes } from "actions/orgTypes";
import office from "entities/offices";
import org from "entities/orgs";
import sanggu from "entities/sanggu";

export const FETCH_HOSTS_REQUEST = "FETCH_HOSTS_REQUEST";
export const fetchHostsRequest = () => ({
  type: FETCH_HOSTS_REQUEST
});

export const FETCH_HOSTS_SUCCESS = "FETCH_HOSTS_SUCCESS";
export const fetchHostsSuccess = ({ officeHosts, orgHosts, sangguHosts }) => ({
  type: FETCH_HOSTS_SUCCESS,
  officeHosts,
  orgHosts,
  sangguHosts
});

export const FETCH_HOSTS_FAILURE = "FETCH_HOSTS_FAILURE";
export const fetchHostsFailure = () => ({
  type: FETCH_HOSTS_FAILURE
});

export const fetchHosts = () => {
  return (dispatch, getState) => {
    const {
      domainData: { hosts }
    } = getState();

    if (!hosts.hasInitiatedFetch || hosts.failedToFetch) {
      dispatch(fetchOrgTypes());
      dispatch(fetchClusters());
      dispatch(fetchHostsRequest());

      return axios
        .get("/event_hosts/1")
        .then(response => {
          const payloadOffices = response.data.office_list;
          const normalizedOffices = normalize(payloadOffices, [office]);
          dispatch(addEntityOffices(normalizedOffices.entities.offices));

          const payloadOrgs = response.data.org_list;
          const normalizedOrgs = normalize(payloadOrgs, [org]);
          dispatch(addEntityOrgs(normalizedOrgs.entities.orgs));

          const payloadSanggu = response.data.sanggu_list;
          const normalizedSanggu = normalize(payloadSanggu, [sanggu]);
          dispatch(addEntitySanggu(normalizedSanggu.entities.sanggu));

          dispatch(
            fetchHostsSuccess({
              officeHosts: normalizedOffices.result,
              orgHosts: normalizedOrgs.result,
              sangguHosts: normalizedSanggu.result
            })
          );
        })
        .catch(error => {
          dispatch(fetchHostsFailure());
        });
    }
  };
};
