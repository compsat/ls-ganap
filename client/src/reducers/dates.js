import { SET_DATE_RANGE } from "actions/dates";

const dates = (state = "All", action) => {
  switch (action.type) {
    case SET_DATE_RANGE:
      return action.dateRange;
    default:
      return state;
  }
};

export default dates;
