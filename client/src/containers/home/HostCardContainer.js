import { connect } from "react-redux";

import HostCard from "components/routes/home/HostCard";
import { makeDenormalizeHost } from "selectors/hostsSelectors";

const mapStateToProps = (state, ownProps) => {
  const denormalizeHost = makeDenormalizeHost(ownProps.hostType, ownProps.id);
  const host = denormalizeHost(state, ownProps);

  return {
    id: host.id,
    name: host.name,
    logoUrl: host.logo_url
  };
};

export default connect(mapStateToProps)(HostCard);
