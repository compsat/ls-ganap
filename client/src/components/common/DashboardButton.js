import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { media } from "style/style-utils";
import SVG from "react-inlinesvg";
import events from "assets/events.png";

const NavLink = ({ className, route, children, onClick }) => (
  <Link className={className} to={route} onClick={onClick}>
    {children}
  </Link>
);

const NavListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;

  ${media.mdScreen`
    justify-content: flex-start;
  `}
`;

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

const DashboardButton = ({ isAuthenticated, userId }) => {
  if (isAuthenticated && userId != null) {
    return (
      <NavListItem>
        <MobileLink route="/dashboard">
          <Icon source={events} alt="My Events Icon" />
        </MobileLink>
        <DesktopLink route="/dashboard">My Events</DesktopLink>
      </NavListItem>
    );
  } else {
    return null;
  }
};

export default DashboardButton;
