import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { Redirect } from "react-router-dom";

class GoogleLoginButton extends Component {
  constructor(props) {
    super(props);
  }

  responseGoogleSuccess = response => {
    console.log(response);
    this.props.convertGoogleToken(response.Zi.access_token);
  };

  responseGoogleFailure = response => {
    console.log(response);
  };

  render() {
    const props = this.props;

    if (!props.isAuthenticated) {
      return (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={this.responseGoogleSuccess}
          onFailure={this.responseGoogleFailure}
          className="loginBtn loginBtn--google"
          prompt="select_account"
          redirectUri={process.env.REACT_APP_GOOGLE_REDIRECT_URI}
        />
      );
    } else {
      return (
        <Redirect
          to={
            (props.location.state && props.location.state.referrer) ||
            "/dashboard"
          }
        />
      );
    }
  }
}

export default GoogleLoginButton;
