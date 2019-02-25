import axios from "axios";

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
      entities: { orgTypes }
    } = getState();

    if (!orgTypes.hasInitiatedFetch) {
      dispatch(fetchOrgTypesRequest());

      return axios
        .get("/org_types")
        .then(response => {
          dispatch(fetchOrgTypesSuccess(response.data.results));
        })
        .catch(error => {
          dispatch(fetchOrgTypesFailure());
        });
    }
  };
};
