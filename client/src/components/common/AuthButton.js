import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { media } from "style/style-utils";
import loginIcon from "assets/icon-login.png";
import googleIcon from "assets/google-logo.svg";
import GoogleLoginButtonContainer from "containers/login/GoogleLoginButtonContainer";

const NavLink = ({ className, route, children, onClick }) => (
  <Link className={className} to={route} onClick={onClick}>
    {children}
  </Link>
);

const Image = ({ className, source, alt }) => (
  <img className={className} src={source} alt={alt} />
);

const Icon = styled(Image)`
  max-height: 25px;
`;

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

const AuthButton = ({ isAuthenticated, handleLogOut }) => {
  if (isAuthenticated) {
    return (
      <React.Fragment>
      	<MobileLink route="" onClick={handleLogOut}>
      	  <Icon source={loginIcon} alt="Authentication Icon" />
      	</MobileLink>
      	<DesktopLink route="" onClick={handleLogOut}>Sign out</DesktopLink>
      </React.Fragment>
    );
  } else {
  	return (
  		<React.Fragment>
	  		<MobileLink route="">
          <GoogleLoginButtonContainer />
	  		</MobileLink>
	  		{/*<DesktopLink route="/login">Sign in</DesktopLink>*/}
        <DesktopLink route="">
          <GoogleLoginButtonContainer />
        </DesktopLink>
  		</React.Fragment>
  	);
  }
};

export default AuthButton;
