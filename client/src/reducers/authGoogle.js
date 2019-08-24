import {
  GOOG_IS_AUTHENTICATING,
  GOOGLE_LOGOUT,
  CONVERT_GOOG_TOKEN_SUCCESS,
  CONVERT_GOOG_TOKEN_FAILURE,
  GOOG_AUTHENTICATE_ACTION,
  VERIFY_AUTH_TOKEN_REQUEST,
  VERIFY_AUTH_TOKEN_SUCCESS,
  VERIFY_AUTH_TOKEN_FAILURE
} from "actions/authGoogle";

const initialState = {
  // err: null,
  // isAuthenticated: false,
  // isAuthenticating: false,
  // token_data: {},
  hasInitiatedPost: false,
  // isPosting: false,
  failedToPost: false,
  isAuthenticated: false,
  isAuthenticating: false,
  email: "",
  userId: null
};

const auth = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case VERIFY_AUTH_TOKEN_REQUEST:
    case GOOG_IS_AUTHENTICATING:
      return Object.assign({}, state, {
        hasInitiatedPost: true,
        isAuthenticating: true,
        isAuthenticated: false,
      });
    case VERIFY_AUTH_TOKEN_SUCCESS:
    case CONVERT_GOOG_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        hasInitiatedPost: false,
        isAuthenticated: true,
        isAuthenticating: false,
        email: action.email,
        userId: action.userId || state.userId
      });
    case VERIFY_AUTH_TOKEN_FAILURE:
    case CONVERT_GOOG_TOKEN_FAILURE:
    case GOOGLE_LOGOUT:
      return Object.assign({}, state, {
        isPosting: false,
        failedToPost: true,
        isAuthenticated: false,
        email: "",
      });
    default:
      return state;
  }
}

export default auth;
