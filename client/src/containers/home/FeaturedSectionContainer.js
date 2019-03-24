import { connect } from "react-redux";

import { fetchEventsFeatured } from "actions/eventsFeatured";
import FeaturedSection from "components/routes/home/FeaturedSection";

const mapStateToProps = state => ({
  eventsFeatured: state.domainData.eventsFeatured.result,
  canDisplayEvents:
    (state.domainData.hosts.officeHosts ||
      state.domainData.hosts.orgHosts ||
      state.domainData.sangguHosts) &&
    state.domainData.venues.result
});

const mapDispatchToProps = dispatch => ({
  fetchEventsFeatured: () => dispatch(fetchEventsFeatured())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturedSection);
