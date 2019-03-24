import { connect } from "react-redux";

import { fetchClusters } from "actions/clusters";
import OrgsSection from "components/routes/home/OrgsSection";

const mapStateToProps = state => ({
  clusters: state.domainData.clusters.result
});

const mapDispatchToProps = dispatch => ({
  fetchClusters: () => dispatch(fetchClusters())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgsSection);
