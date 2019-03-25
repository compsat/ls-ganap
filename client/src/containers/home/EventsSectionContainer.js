import { connect } from "react-redux";

import { fetchEventsUpcoming } from "actions/eventsUpcoming";
import EventsSection from "components/routes/home/EventsSection";

const mapStateToProps = state => ({
  eventsUpcoming: state.domainData.eventsUpcoming.result,
  canDisplayEvents: !!(
    (state.domainData.hosts.officeHosts.length ||
      state.domainData.hosts.orgHosts.length ||
      state.domainData.hosts.sangguHosts.length) &&
    state.domainData.venues.result.length
  )
});

const mapDispatchToProps = dispatch => ({
  fetchEventsUpcoming: () => dispatch(fetchEventsUpcoming())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsSection);
