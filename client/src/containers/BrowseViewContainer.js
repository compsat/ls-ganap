import { connect } from "react-redux";

import BrowseView from "../browse/BrowseView";
import { fetchEvents } from "../actions/events";
import { fetchVenues } from "../actions/venues";

const mapStateToProps = state => ({
  events: state.events,
  venues: state.venues
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  fetchVenues: () => dispatch(fetchVenues())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseView);
