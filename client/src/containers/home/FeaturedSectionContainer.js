import { connect } from "react-redux";

import { fetchEventsFeatured } from "actions/eventsFeatured";
import FeaturedSection from "components/routes/home/FeaturedSection";

const mapStateToProps = state => ({
  eventsFeatured: state.domainData.eventsFeatured.result,
  canDisplayEvents: !!(
    (state.domainData.hosts.officeHosts.length ||
      state.domainData.hosts.orgHosts.length ||
      state.domainData.hosts.sangguHosts.length) &&
    state.domainData.venues.result.length
  )
});

const mapDispatchToProps = dispatch => ({
  fetchEventsFeatured: () => dispatch(fetchEventsFeatured())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturedSection);
