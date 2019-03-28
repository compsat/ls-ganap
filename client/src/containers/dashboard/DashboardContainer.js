import { connect } from "react-redux";
import { fetchEventsPending } from "actions/eventsPending";
import { fetchEventsApproved } from "actions/eventsApproved";
import Dashboard from "components/routes/dashboard/Dashboard";

const mapStateToProps = state => ({
  canDisplayEvents: !!(
    (state.domainData.hosts.officeHosts.length ||
      state.domainData.hosts.orgHosts.length ||
      state.domainData.hosts.sangguHosts.length) &&
    state.domainData.venues.result.length
  ),
  eventsPending: state.domainData.eventsPending.result,
  eventsApproved: state.domainData.eventsApproved.result,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  fetchEventsPending: () => dispatch(fetchEventsPending()),
  fetchEventsApproved: userId => dispatch(fetchEventsApproved(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
