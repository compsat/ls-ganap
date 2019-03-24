import axios from "axios";
import { normalize } from "normalizr";

import { addEntityOrgTypes } from "actions/entities";
import orgType from "entities/orgTypes";

export const FETCH_ORG_TYPES_REQUEST = "FETCH_ORG_TYPES_REQUEST";
export const fetchOrgTypesRequest = () => ({
  type: FETCH_ORG_TYPES_REQUEST
});

export const FETCH_ORG_TYPES_SUCCESS = "FETCH_ORG_TYPES_SUCCESS";
export const fetchOrgTypesSuccess = orgTypes => ({
  type: FETCH_ORG_TYPES_SUCCESS,
  orgTypes
});

export const FETCH_ORG_TYPES_FAILURE = "FETCH_ORG_TYPES_FAILURE";
export const fetchOrgTypesFailure = () => ({
  type: FETCH_ORG_TYPES_FAILURE
});

export const fetchOrgTypes = () => {
  return (dispatch, getState) => {
    const {
      domainData: { orgTypes }
    } = getState();

    if (!orgTypes.hasInitiatedFetch || orgTypes.failedToFetch) {
      dispatch(fetchOrgTypesRequest());

      return axios
        .get("/org_types")
        .then(response => {
          const payload = response.data.results;
          const normalizedData = normalize(payload, [orgType]);

          dispatch(addEntityOrgTypes(normalizedData.entities.orgTypes));
          dispatch(fetchOrgTypesSuccess(normalizedData.result));
        })
        .catch(error => {
          dispatch(fetchOrgTypesFailure());
        });
    }
  };
};
