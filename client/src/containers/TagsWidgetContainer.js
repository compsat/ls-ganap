import { connect } from 'react-redux';
import { toggleTag, fetchTags } from '../actions/tags';

import TagsWidget from '../browse/TagsWidget';

const mapStateToProps = state => ({
  tags: state.tags.items
});

const mapDispatchToProps = dispatch => ({
  toggleTag: (tagId) => dispatch(toggleTag(tagId)),
  fetchTags: () => dispatch(fetchTags())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsWidget);
