import { connect } from "react-redux";
import Login from "components/routes/login/Login";

import { postAuthToken } from "actions/auth";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  handleLogIn: (event, email, password) => {
    event.preventDefault();
    return dispatch(postAuthToken(email, password));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
