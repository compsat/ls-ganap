import {
  FETCH_CLUSTERS_REQUEST,
  FETCH_CLUSTERS_SUCCESS,
  FETCH_CLUSTERS_FAILURE
} from "actions/clusters";

const clusters = (
  state = {
    hasInitiatedFetch: false,
    isFetching: false,
    failedToFetch: false,
    result: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_CLUSTERS_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedFetch: true,
        isFetching: true
      });
    case FETCH_CLUSTERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        result: action.clusters
      });
    case FETCH_CLUSTERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        failedToFetch: true
      });
    default:
      return state;
  }
};

export default clusters;
