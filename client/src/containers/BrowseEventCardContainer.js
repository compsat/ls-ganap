import { connect } from "react-redux";
import BrowseEventCard from "../browse/BrowseEventCard";

const mapStateToProps = state => ({
  hosts: state.entities.hosts.items,
  venues: state.entities.venues.items
});

export default connect(
  mapStateToProps
)(BrowseEventCard);
