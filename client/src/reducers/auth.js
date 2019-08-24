import {
  POST_AUTH_TOKEN_REQUEST,
  POST_AUTH_TOKEN_SUCCESS,
  POST_AUTH_TOKEN_FAILURE,
  VERIFY_AUTH_TOKEN_REQUEST,
  VERIFY_AUTH_TOKEN_SUCCESS,
  VERIFY_AUTH_TOKEN_FAILURE,
  CLEAR_AUTH_TOKEN
} from "actions/auth";

const auth = (
  state = {
    hasInitiatedPost: false,
    isPosting: false,
    failedToPost: false,
    isAuthenticated: false,
    email: "",
    userId: null
  },
  action
) => {
  switch (action.type) {
    case POST_AUTH_TOKEN_REQUEST:
    case VERIFY_AUTH_TOKEN_REQUEST:
      return Object.assign({}, state, {
        hasInitiatedPost: true,
        isPosting: true
      });
    case POST_AUTH_TOKEN_SUCCESS:
    case VERIFY_AUTH_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        isPosting: false,
        isAuthenticated: true,
        email: action.email,
        userId: action.userId || state.userId
      });
    case POST_AUTH_TOKEN_FAILURE:
    case VERIFY_AUTH_TOKEN_FAILURE:
    case CLEAR_AUTH_TOKEN:
      return Object.assign({}, state, {
        isPosting: false,
        failedToPost: true,
        isAuthenticated: false,
        email: "",
        userId: null,
      });
    default:
      return state;
  }
};

export default auth;
