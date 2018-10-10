import { connect } from "react-redux";

import FilterBar from "../browse/FilterBar";

const mapStateToProps = state => ({
  activeHost: state.hosts.activeHost,
  activeTags:
    state.tags.items
      .filter(tag => tag.active)
      .map(tag => tag.name)
      .join(", "),
  activeDates: state.dates
});

export default connect(mapStateToProps)(FilterBar);
