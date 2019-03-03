import { connect } from "react-redux";

import App from "App";
import { verifyAuthToken } from "actions/auth";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  verifyAuthToken: () => {
    const authToken = sessionStorage.getItem("authToken");

    if (authToken) {
      dispatch(verifyAuthToken(authToken));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
