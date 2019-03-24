import axios from "axios";
import { normalize } from "normalizr";

import { addEntityClusters } from "actions/entities";
import cluster from "entities/clusters";

export const FETCH_CLUSTERS_REQUEST = "FETCH_CLUSTERS_REQUEST";
export const fetchClustersRequest = () => ({
  type: FETCH_CLUSTERS_REQUEST
});

export const FETCH_CLUSTERS_SUCCESS = "FETCH_CLUSTERS_SUCCESS";
export const fetchClustersSuccess = clusters => ({
  type: FETCH_CLUSTERS_SUCCESS,
  clusters
});

export const FETCH_CLUSTERS_FAILURE = "FETCH_CLUSTERS_FAILURE";
export const fetchClustersFailure = () => ({
  type: FETCH_CLUSTERS_FAILURE
});

export const fetchClusters = () => {
  return (dispatch, getState) => {
    const {
      domainData: { clusters }
    } = getState();

    if (!clusters.hasInitiatedFetch || clusters.failedToFetch) {
      dispatch(fetchClustersRequest());

      return axios
        .get("/clusters")
        .then(response => {
          const payload = response.data.results;
          const normalizedData = normalize(payload, [cluster]);

          dispatch(addEntityClusters(normalizedData.entities.clusters));
          dispatch(fetchClustersSuccess(normalizedData.result));
        })
        .catch(error => {
          dispatch(fetchClustersFailure());
        });
    }
  };
};
