import {
  SELECT_HOST,
  SELECT_AUDIENCE,
  TOGGLE_TAG,
  SET_DATE_RANGE,
  UPDATE_QUERY
} from "actions/filters";

const filters = (
  state = {
    host: { id: null, hostGroupId: null, name: "", abbreviation: "" },
    tags: [],
    audience: "",
    dateRange: {
      key: "All",
      startDate: null,
      endDate: null
    },
    query: ""
  },
  action
) => {
  switch (action.type) {
    case SELECT_HOST:
      return Object.assign({}, state, {
        host: action.host
      });
    case SELECT_AUDIENCE:
      return Object.assign({}, state, {
        audience: action.audience
      });
    case TOGGLE_TAG:
      return Object.assign({}, state, {
        tags: state.tags.includes(action.id)
          ? state.tags.filter(tag => tag !== action.id)
          : [...state.tags, action.id]
      });
    case SET_DATE_RANGE:
      return Object.assign({}, state, {
        dateRange: action.dateRange
      });
    case UPDATE_QUERY:
      return Object.assign({}, state, {
        query: action.query
      });
    default:
      return state;
  }
};

export default filters;
