import { connect } from "react-redux";
import { toggleTag } from "actions/filters";
import { fetchTags } from "actions/tags";

import TagsWidget from "components/routes/browse/TagsWidget";

const mapStateToProps = state => ({
  activeTags: state.filters.tags,
  tags: state.entities.tags.items
});

const mapDispatchToProps = dispatch => ({
  toggleTag: tagId => dispatch(toggleTag(tagId)),
  fetchTags: () => dispatch(fetchTags())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsWidget);
