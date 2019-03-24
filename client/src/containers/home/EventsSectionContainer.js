import { connect } from "react-redux";

import { fetchEventsUpcoming } from "actions/eventsUpcoming";
import EventsSection from "components/routes/home/EventsSection";

const mapStateToProps = state => ({
  eventsUpcoming: state.domainData.eventsUpcoming.result,
  canDisplayEvents:
    (state.domainData.hosts.officeHosts ||
      state.domainData.hosts.orgHosts ||
      state.domainData.sangguHosts) &&
    state.domainData.venues.result
});

const mapDispatchToProps = dispatch => ({
  fetchEventsUpcoming: () => dispatch(fetchEventsUpcoming())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsSection);
