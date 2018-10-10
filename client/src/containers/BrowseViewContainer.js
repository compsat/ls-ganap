import { connect } from "react-redux";

import BrowseView from "../browse/BrowseView";
import { fetchVenues } from "../actions/venues";

const mapStateToProps = state => ({
  venues: state.venues
});

const mapDispatchToProps = dispatch => ({
  fetchVenues: () => dispatch(fetchVenues())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseView);
