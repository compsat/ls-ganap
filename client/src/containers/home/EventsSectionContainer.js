import { connect } from "react-redux";
import { endOfWeek, format } from "date-fns";

import { fetchEvents } from "actions/events";
import EventsSection from "components/routes/home/EventsSection";
import { makeCanDisplayEvents } from "selectors/eventsSelectors";

const canDisplayEvents = makeCanDisplayEvents();

const mapStateToProps = state => ({
  events: state.entities.events,
  canDisplayEvents: canDisplayEvents(state)
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => {
    const today = new Date();

    dispatch(
      fetchEvents({
        start_date: format(today, "YYYY-MM-DD"),
        end_date: format(endOfWeek(today), "YYYY-MM-DD")
      })
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsSection);
