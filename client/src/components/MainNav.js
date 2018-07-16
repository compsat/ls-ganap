import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/ls-ganap-logo.png';
import styled from 'styled-components';
import FullWidthContainer from './FullWidthContainer';
import PageContent from './PageContent';

const NavLink = ({className, route, children}) => (
  <Link className={className} to={route}>{children}</Link>
)

const Image = ({className, source, alt}) => (
  <img className={className} src={source} alt={alt}/>
)

const Nav = FullWidthContainer.extend`
  position: fixed;
  width: 100%;
  height: 5em;

  font-family: sans-serif;
  text-transform: uppercase;

  @media all and (min-width: 480px) {
    border-top: solid 10px #C5A478;
  }
`;

const NavList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  height: 100%;
  margin: 0; 
  padding: 0;

  @media all and (min-width: 480px) {
    grid-template-columns: 1fr 150px 150px;
    width: 100%
  }
`;

const NavListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;

  @media all and (min-width: 480px) {
    justify-content: flex-start;
  }
`;

const Logo = styled(Image)`
  max-height: 2.4em;
`;

const MobileLink = styled(NavLink)`
  display: block;
  color: #E07B24;
  text-decoration: none;

  @media all and (min-width: 480px) {
    display: none;
  }
`;

const DesktopLink = styled(NavLink)`
  display: none;
  color: #E07B24;
  text-decoration: none;

  @media all and (min-width: 480px) {
    display: block;
  }
`;

const DesktopLogo = DesktopLink.extend`
  @media all and (min-width: 480px) {
    display:block;
    text-align: right;
  }
`;

class MainNav extends Component {
  render() {
    return (
      <Nav>
        <PageContent>
          <NavList>
            <NavListItem>
              <MobileLink route="/">Home</MobileLink>
              <DesktopLogo route="/"><Logo source={logo} alt='LS Ganap Logo' /></DesktopLogo>
            </NavListItem>
            <NavListItem>
              <MobileLink route="/"><Logo source={logo} alt='LS Ganap Logo' /></MobileLink>
              <DesktopLink route="/">Home</DesktopLink>
            </NavListItem>
            <NavListItem>
              <MobileLink route="/">Browse</MobileLink>
              <DesktopLink route="/browse">Browse</DesktopLink>
            </NavListItem>
          </NavList>
        </PageContent>
      </Nav>
    );
  }
}

export default MainNav;
