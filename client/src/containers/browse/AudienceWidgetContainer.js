import { connect } from "react-redux";

import { selectAudience } from "actions/filters";
import { fetchAudiences } from "actions/audiences";
import AudienceWidget from "components/routes/browse/AudienceWidget";

const mapStateToProps = state => ({
  activeAudience: state.filters.audience,
  audiences: state.entities.audiences
});

const mapDispatchToProps = dispatch => ({
  selectAudience: tagId => dispatch(selectAudience(tagId)),
  fetchAudiences: () => dispatch(fetchAudiences())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudienceWidget);
