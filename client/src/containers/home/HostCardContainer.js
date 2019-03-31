import { connect } from "react-redux";

import HostCard from "components/routes/home/HostCard";
import { makeDenormalizeHost } from "selectors/hostsSelectors";
import { selectHost } from "actions/filters";

const mapStateToProps = (state, ownProps) => {
  const denormalizeHost = makeDenormalizeHost(ownProps.hostType, ownProps.id);
  const host = denormalizeHost(state, ownProps);

  return {
  host: host,
    id: host.id,
    name: host.name,
    logoUrl: host.logo_url
  };
};

const mapDispatchToProps = dispatch => ({
  selectHost: host => dispatch(selectHost(host))
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(HostCard);
