import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { media } from "style/style-utils";

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

const AuthButton = ({ isAuthenticated, handleLogOut }) => {
  if (isAuthenticated) {
    return (
      <DesktopLink route="" onClick={handleLogOut}>Sign out</DesktopLink>
    );
  } else {
  	return <DesktopLink route="/login">Sign in</DesktopLink>
  }
};

export default AuthButton;
