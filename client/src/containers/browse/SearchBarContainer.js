import { connect } from 'react-redux';
import { updateQuery } from 'actions/filters';
import SearchBar from 'components/routes/browse/SearchBar';

const mapStateToProps = state => ({
  query: state.filters.query
});

const mapDispatchToProps = dispatch => ({
  updateQuery: (query) => dispatch(updateQuery(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
