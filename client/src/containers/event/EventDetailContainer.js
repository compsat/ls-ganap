import { connect } from "react-redux";

import { fetchEvents } from "actions/events";
import EventDetailSection from "components/routes/event/EventDetailSection";
import { makeCanDisplayEvents } from "selectors/eventsSelectors";

const canDisplayEvents = makeCanDisplayEvents();

const mapStateToProps = state => ({
  events: state.entities.events,
  canDisplayEvents: canDisplayEvents(state)
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailSection);
