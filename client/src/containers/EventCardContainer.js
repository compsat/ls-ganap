import { connect } from "react-redux";
import EventCard from "../browse/EventCard";

const mapStateToProps = state => ({
  hosts: state.entities.hosts.items,
  venues: state.entities.venues.items
});

export default connect(
  mapStateToProps
)(EventCard);
