import axios from "axios";

export const GOOG_IS_AUTHENTICATING = "GOOG_IS_AUTHENTICATING";
export const isAuthenticating = () => ({
  type: GOOG_IS_AUTHENTICATING
});

export const CONVERT_GOOG_TOKEN_SUCCESS = "CONVERT_GOOG_TOKEN_SUCCESS";
export const convertGoogTokenSuccess = (email, userId) => {
  return {
    type: CONVERT_GOOG_TOKEN_SUCCESS,
    email,
    userId
  };
}

export const GOOGLE_LOGOUT = "GOOGLE_LOGOUT";
export const googleLogoutAction = () => {
  return (dispatch, getState) => {
    const { auth } = getState();

    if (auth.isAuthenticated) {
      localStorage.removeItem("authToken");
      axios.defaults.headers.common["Authorization"] = "";
      dispatch({ type: GOOGLE_LOGOUT });
    }
  };
}

export const CONVERT_GOOG_TOKEN_FAILURE = "CONVERT_GOOG_TOKEN_FAILURE";
export const convertGoogTokenFailure = err => ({
  type: CONVERT_GOOG_TOKEN_FAILURE,
  err
});

export const GOOG_AUTHENTICATE_ACTION = "GOOG_AUTHENTICATE_ACTION";

export const convertGoogleToken = access_token => {
  return dispatch => {
    dispatch(isAuthenticating());
    const provider = "google-oauth2";

    return axios
      .post("/oauth/login/", {
        provider,
        access_token
      })
      .then(response => {
        const authToken = response.data.token;
        localStorage.setItem("authToken", authToken);
        axios.defaults.headers.common["Authorization"] = "JWT " + authToken;
        dispatch(convertGoogTokenSuccess(response.data.email, response.data.userId));
      })
      .catch(error => {
        dispatch(convertGoogTokenFailure(error));
      })
  };
}

export const VERIFY_AUTH_TOKEN_REQUEST = "VERIFY_AUTH_TOKEN_REQUEST";
export const verifyAuthTokenRequest = () => ({
  type: VERIFY_AUTH_TOKEN_REQUEST
});

export const VERIFY_AUTH_TOKEN_SUCCESS = "VERIFY_AUTH_TOKEN_SUCCESS";
export const verifyAuthTokenSuccess = (email, userId) => ({
  type: VERIFY_AUTH_TOKEN_SUCCESS,
  email,
  userId
});

export const VERIFY_AUTH_TOKEN_FAILURE = "VERIFY_AUTH_TOKEN_FAILURE";
export const verifyAuthTokenFailure = () => ({
  type: VERIFY_AUTH_TOKEN_FAILURE
});

export const verifyAuthToken = token => {
  return (dispatch, getState) => {
    const { auth } = getState();

    if (!auth.hasInitiatedPost) {
      dispatch(verifyAuthTokenRequest());

      return axios
        .post("/auth/token-verify/", {
          token
        })
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "JWT " + token;
          dispatch(verifyAuthTokenSuccess(response.data.email, response.data.id));
        })
        .catch(error => {
          localStorage.removeItem("authToken");
          axios.defaults.headers.common["Authorization"] = "";
          dispatch(verifyAuthTokenFailure());
        });
    }
  };
};