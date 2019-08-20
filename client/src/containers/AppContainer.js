import { connect } from "react-redux";

import App from "App";
// import { verifyAuthToken } from "actions/auth";
import { verifyAuthToken } from "actions/authGoogle";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  verifyAuthToken: () => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      dispatch(verifyAuthToken(authToken));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
