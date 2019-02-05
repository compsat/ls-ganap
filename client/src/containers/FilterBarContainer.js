import { connect } from "react-redux";

import FilterBar from "../browse/FilterBar";

const mapStateToProps = state => ({
  host: state.filters.host.abbreviation || state.filters.host.name,
  tags: state.entities.tags.items
    .filter(tag => {
      return state.filters.tags.includes(tag.id);
    })
    .map(tag => tag.name)
    .join(", "),
  dateRange: state.filters.dateRange.key
});

export default connect(mapStateToProps)(FilterBar);
