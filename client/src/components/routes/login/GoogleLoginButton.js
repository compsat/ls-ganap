import React, { Component } from "react";
import styled from "styled-components";
import { media } from "style/style-utils";
import { GoogleLogin } from "react-google-login";
import googleIcon from "assets/google-logo.svg";
import { Redirect, Link } from "react-router-dom";

const NavLink = ({ className, route, children, onClick }) => (
  <Link className={className} to={route} onClick={onClick}>
    {children}
  </Link>
);

const MobileLink = styled(NavLink)`
  display: block;
  color: #e07b24;
  text-decoration: none;

  ${media.mdScreen`
    display: none;
  `}
`;

const DesktopLink = styled(NavLink)`
  display: none;
  color: #e07b24;
  text-decoration: none;

  ${media.mdScreen`
    display: block;
    width: 100%;
    text-align: right;
  `}
`;

const Image = ({ className, source, alt, onclick, disabled }) => (
  <input
    type="image"
    className={className}
    src={source}
    alt={alt}
    onClick={onclick}
    disabled={disabled}
  />
);

const Icon = styled(Image)`
  min-height: 25px;
  min-width: 25px;
  max-height: 55px;
`;

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
        <React.Fragment>
          <DesktopLink route="">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={this.responseGoogleSuccess}
              onFailure={this.responseGoogleFailure}
              className="loginBtn loginBtn--google"
              prompt="select_account"
              redirectUri={process.env.REACT_APP_GOOGLE_REDIRECT_URI}
            />
          </DesktopLink>
          <MobileLink route="">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              render={renderProps => (
                <Icon
                  onclick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  source={googleIcon}
                />
              )}
              buttonText="Login with Google"
              onSuccess={this.responseGoogleSuccess}
              onFailure={this.responseGoogleFailure}
              className="loginBtn loginBtn--google"
              prompt="select_account"
              redirectUri={process.env.REACT_APP_GOOGLE_REDIRECT_URI}
            />
          </MobileLink>
        </React.Fragment>
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
