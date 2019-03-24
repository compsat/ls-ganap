import { connect } from "react-redux";
import { denormalize } from "normalizr";

import tag from "entities/tags";
import FilterBar from "components/routes/browse/FilterBar";

const mapStateToProps = state => ({
  host: state.filters.host.abbreviation || state.filters.host.name,
  tags: denormalize(state.filters.tags, [tag], {
    tags: state.entities.tags
  })
    .map(tag => tag.name)
    .join(", "),
  dateRange: state.filters.dateRange.key
});

export default connect(mapStateToProps)(FilterBar);
