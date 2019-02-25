import { connect } from "react-redux";
import { selectHost } from "actions/filters";
import { fetchHosts } from "actions/hosts";

import HostWidget from "components/routes/browse/HostWidget";
import { makeStructureHosts } from "selectors/hostsSelectors";

const structureHosts = makeStructureHosts();

const mapStateToProps = state => ({
  hosts: structureHosts(state)
});

const mapDispatchToProps = dispatch => ({
  selectHost: host => dispatch(selectHost(host)),
  fetchHosts: () => dispatch(fetchHosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HostWidget);
