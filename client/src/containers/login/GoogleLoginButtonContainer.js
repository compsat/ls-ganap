import { convertGoogleToken } from "../../actions/authGoogle";
import GoogleLoginButton from "../../components/routes/login/GoogleLoginButton";

import { connect } from "react-redux";

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	convertGoogleToken: access_token => {
		dispatch(convertGoogleToken(access_token));
		ownProps.history.push("/");
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GoogleLoginButton);
