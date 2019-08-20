import { connect } from "react-redux";

import DashboardButton from "components/common/DashboardButton";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userId: state.auth.userId
});

export default connect(
  mapStateToProps,
)(DashboardButton);
