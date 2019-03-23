import { connect } from "react-redux";
import { withRouter } from "react-router";

import { clearAuthToken } from "actions/auth";
import AuthButton from "components/common/AuthButton";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleLogOut: () => {
    dispatch(clearAuthToken());
    ownProps.history.push("/");
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthButton)
);
