import { connect } from "react-redux";

import DateWidget from "../browse/DateWidget";
import { selectDateRange } from "../actions/dates";

const mapStateToProps = state => ({
  dates: state.dates
});

const mapDispatchToProps = dispatch => ({
  selectDateRange: dateRange => dispatch(selectDateRange(dateRange))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateWidget);
