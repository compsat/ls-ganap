import { connect } from "react-redux";

import { fetchEventsSingle } from "actions/eventsSingle";
import { fetchAudiences } from "actions/audiences";
import EventDetailSection from "components/routes/event/EventDetailSection";

const mapStateToProps = state => ({
  audiences: Object.values(state.entities.audiences).map(audience => ({
    value: audience.value,
    label: audience.name
  })),
  eventsSingle: state.domainData.eventsSingle.result,
  canDisplayEvents: !!(
    (state.domainData.hosts.officeHosts.length ||
      state.domainData.hosts.orgHosts.length ||
      state.domainData.hosts.sangguHosts.length) &&
    state.domainData.venues.result.length
  )
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchEventsSingle: () => dispatch(fetchEventsSingle(ownProps.match.params.id)),
  fetchAudiences: () => dispatch(fetchAudiences())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailSection);
