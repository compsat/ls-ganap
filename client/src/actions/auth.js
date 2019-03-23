import axios from "axios";

export const POST_AUTH_TOKEN_REQUEST = "POST_AUTH_TOKEN_REQUEST";
export const postAuthTokenRequest = () => ({
  type: POST_AUTH_TOKEN_REQUEST
});

export const POST_AUTH_TOKEN_SUCCESS = "POST_AUTH_TOKEN_SUCCESS";
export const postAuthTokenSuccess = (email, userId) => ({
  type: POST_AUTH_TOKEN_SUCCESS,
  email,
  userId
});

export const POST_AUTH_TOKEN_FAILURE = "POST_AUTH_TOKEN_FAILURE";
export const postAuthTokenFailure = () => ({
  type: POST_AUTH_TOKEN_FAILURE
});

export const postAuthToken = (email, password) => {
  return dispatch => {
    dispatch(postAuthTokenRequest());

    return axios
      .post("/auth/token/", {
        email,
        password
      })
      .then(response => {
        const authToken = response.data.token;
        sessionStorage.setItem("authToken", authToken);
        axios.defaults.headers.common["Authorization"] = authToken;
        dispatch(postAuthTokenSuccess(email, response.data.id));
      })
      .catch(error => {
        dispatch(postAuthTokenFailure());
      });
  };
};

export const VERIFY_AUTH_TOKEN_REQUEST = "VERIFY_AUTH_TOKEN_REQUEST";
export const verifyAuthTokenRequest = () => ({
  type: VERIFY_AUTH_TOKEN_REQUEST
});

export const VERIFY_AUTH_TOKEN_SUCCESS = "VERIFY_AUTH_TOKEN_SUCCESS";
export const verifyAuthTokenSuccess = email => ({
  type: VERIFY_AUTH_TOKEN_SUCCESS,
  email
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
          axios.defaults.headers.common["Authorization"] = token;
          dispatch(verifyAuthTokenSuccess(response.data.email));
        })
        .catch(error => {
          sessionStorage.removeItem("authToken");
          axios.defaults.headers.common["Authorization"] = "";
          dispatch(verifyAuthTokenFailure());
        });
    }
  };
};

export const CLEAR_AUTH_TOKEN = "CLEAR_AUTH_TOKEN";
export const clearAuthToken = () => {
  return (dispatch, getState) => {
    const { auth } = getState();

    if (auth.isAuthenticated) {
      sessionStorage.removeItem("authToken");
      axios.defaults.headers.common["Authorization"] = "";
      dispatch({ type: CLEAR_AUTH_TOKEN });
    }
  };
};
