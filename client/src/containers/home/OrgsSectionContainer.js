import { connect } from "react-redux";

import { fetchClusters } from "actions/clusters";
import { selectHost } from "actions/filters";
import OrgsSection from "components/routes/home/OrgsSection";

const mapStateToProps = state => ({
  clusters: state.domainData.clusters.result
});

const mapDispatchToProps = dispatch => ({
  fetchClusters: () => dispatch(fetchClusters()),
  selectHost: (host) => dispatch(selectHost(host))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgsSection);
