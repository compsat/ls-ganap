import { SELECT_DATE_RANGE } from "../actions/dates";

const dates = (state = "All", action) => {
  switch (action.type) {
    case SELECT_DATE_RANGE:
      return action.dateRange;
    default:
      return state;
  }
};

export default dates;
