import { connect } from "react-redux";

import { fetchEventsFeatured } from "actions/eventsFeatured";
import { fetchAudiences } from "actions/audiences";
import FeaturedSection from "components/routes/home/FeaturedSection";

const mapStateToProps = state => ({
  audiences: Object.values(state.entities.audiences).map(audience => ({
    value: audience.value,
    label: audience.name
  })),
  eventsFeatured: state.domainData.eventsFeatured.result,
  canDisplayEvents: !!(
    (state.domainData.hosts.officeHosts.length ||
      state.domainData.hosts.orgHosts.length ||
      state.domainData.hosts.sangguHosts.length) &&
    state.domainData.venues.result.length
  )
});

const mapDispatchToProps = dispatch => ({
  fetchEventsFeatured: () => dispatch(fetchEventsFeatured()),
  fetchAudiences: () => dispatch(fetchAudiences())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturedSection);
