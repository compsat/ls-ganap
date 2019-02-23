import { connect } from "react-redux";
import { endOfWeek, endOfMonth } from "date-fns";

import DateWidget from "components/routes/browse/DateWidget";
import { setDateRange } from "actions/filters";

const today = new Date();
const dateRanges = [
  {
    key: "All",
    startDate: null,
    endDate: null,
  },
  {
    key: "Today",
    startDate: today,
    endDate: today,
  },
  {
    key: "This Week",
    startDate: today,
    endDate: endOfWeek(today),
  },
  {
    key: "This Month",
    startDate: today,
    endDate: endOfMonth(today),
  },
];

const mapStateToProps = state => ({
  dateRanges: dateRanges.map((dateRange) => dateRange.key),
  activeDateRange: state.filters.dateRange
});

const mapDispatchToProps = dispatch => ({
  setDateRange: selectedDateRange => {
    const dateRangeObject = dateRanges.find((dateRange) => {
      return dateRange.key === selectedDateRange
    });

    dispatch(setDateRange(dateRangeObject));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateWidget);
