import { connect } from "react-redux";

import { fetchEventsSingle } from "actions/eventsSingle";
import EventDetailSection from "components/routes/event/EventDetailSection";

const mapStateToProps = state => ({
  eventsSingle: state.domainData.eventsSingle.result,
  canDisplayEvents: !!(
    (state.domainData.hosts.officeHosts.length ||
      state.domainData.hosts.orgHosts.length ||
      state.domainData.hosts.sangguHosts.length) &&
    state.domainData.venues.result.length
  )
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchEventsSingle: () => dispatch(fetchEventsSingle(ownProps.match.params.id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailSection);
