import { connect } from "react-redux";
import { withRouter } from "react-router";

import { googleLogoutAction } from "actions/authGoogle";
// import { clearAuthToken } from "actions/auth";
import AuthButton from "components/common/AuthButton";

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userId: state.auth.userId,
  history: ownProps.history
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleLogOut: () => {
    dispatch(googleLogoutAction());
    ownProps.history.push("/");
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthButton)
);
