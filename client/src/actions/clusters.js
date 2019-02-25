import axios from "axios";

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
      entities: { clusters }
    } = getState();

    if (!clusters.hasInitiatedFetch) {
      dispatch(fetchClustersRequest());

      return axios
        .get("/clusters")
        .then(response => {
          dispatch(fetchClustersSuccess(response.data.results));
        })
        .catch(error => {
          dispatch(fetchClustersFailure());
        });
    }
  };
};
