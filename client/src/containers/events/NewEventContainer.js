import { connectWithLifecycle } from "react-lifecycle-component";

import { fetchAudiences } from "actions/audiences";
import { fetchHosts } from "actions/hosts";
import { fetchVenues } from "actions/venues";
import { fetchTags } from "actions/tags";
import NewEvent from "components/routes/events/NewEvent";

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
  }))
});

const mapDispatchToProps = dispatch => ({
  componentDidMount: () => {
    dispatch(fetchAudiences());
    dispatch(fetchHosts());
    dispatch(fetchVenues());
    dispatch(fetchTags());
  }
});

export default connectWithLifecycle(mapStateToProps, mapDispatchToProps)(
  NewEvent
);
