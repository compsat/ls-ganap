import { connect } from "react-redux";

import { fetchEvents } from "actions/events";
import FeaturedSection from "components/routes/home/FeaturedSection";
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
)(FeaturedSection);
