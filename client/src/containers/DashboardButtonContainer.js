import { connect } from "react-redux";

import DashboardButton from "components/common/DashboardButton";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
)(DashboardButton);
