import { connect } from "react-redux";
import PrivateRoute from "components/PrivateRoute";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
