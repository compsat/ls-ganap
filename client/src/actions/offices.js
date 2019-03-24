import axios from "axios";
import { normalize } from "normalizr";
import queryString from "query-string";

import { addEntityOffices } from "actions/entities";
import office from "entities/offices";

export const FETCH_OFFICES_REQUEST = "FETCH_OFFICES_REQUEST";
export const fetchOfficesRequest = () => ({
  type: FETCH_OFFICES_REQUEST
});

export const FETCH_OFFICES_SUCCESS = "FETCH_OFFICES_SUCCESS";
export const fetchOfficesSuccess = ({ offices, page }) => ({
  type: FETCH_OFFICES_SUCCESS,
  offices,
  page
});

export const FETCH_OFFICES_FAILURE = "FETCH_OFFICES_FAILURE";
export const fetchOfficesFailure = () => ({
  type: FETCH_OFFICES_FAILURE
});

export const fetchOffices = page => {
  return dispatch => {
    dispatch(fetchOfficesRequest());

    return axios
      .get("/offices?" + queryString.stringify({ page }))
      .then(response => {
        const payload = response.data.results;
        const normalizedData = normalize(payload, [office]);

        dispatch(addEntityOffices(normalizedData.entities.offices));
        dispatch(
          fetchOfficesSuccess({
            page,
            offices: normalizedData.result
          })
        );
      })
      .catch(error => {
        dispatch(fetchOfficesFailure());
      });
  };
};
