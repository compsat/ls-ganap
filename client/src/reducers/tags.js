import {
  TOGGLE_TAG,
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE
} from "../actions/tags";

const tags = (
  state = {
    isFetching: false,
    failedToFetch: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case TOGGLE_TAG:
      return Object.assign({}, state, {
        items: state.items.map(
          tag => (tag.id === action.id ? { ...tag, active: !tag.active } : tag)
        )
      });
    case FETCH_TAGS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_TAGS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.tags.map(tag => ({
          ...tag,
          active: false
        }))
      });
    case FETCH_TAGS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        failedToFetch: true
      });
    default:
      return state;
  }
};

export default tags;
