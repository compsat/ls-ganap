import { connectWithLifecycle } from "react-lifecycle-component";

import { fetchAudiences } from "actions/audiences";
import { fetchHosts } from "actions/hosts";
import { fetchVenues } from "actions/venues";
import { fetchTags } from "actions/tags";
import { fetchEventsSingle } from "actions/eventsSingle";
import EventEditSection from "components/routes/event/EventEditSection";

const mapStateToProps = state => ({
  // TODO: Rewrite with selectors
  audiences: Object.values(state.entities.audiences).map(audience => ({
    value: audience.value,
    label: audience.name
  })),
  hosts: [
    ...Object.values(state.entities.offices),
    ...Object.values(state.entities.orgs),
    ...Object.values(state.entities.sanggu)
  ].map(host => ({
    value: host.id,
    label: host.abbreviation
  })),
  venues: Object.values(state.entities.venues).map(venue => ({
    value: venue.id,
    label: venue.name
  })),
  tags: Object.values(state.entities.tags).map(tag => ({
    value: tag.id,
    label: tag.name
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
  componentDidMount: () => {
    dispatch(fetchAudiences());
    dispatch(fetchHosts());
    dispatch(fetchVenues());
    dispatch(fetchTags());
    dispatch(fetchEventsSingle(ownProps.match.params.id));
  }
});

export default connectWithLifecycle(mapStateToProps, mapDispatchToProps)(
  EventEditSection
);
