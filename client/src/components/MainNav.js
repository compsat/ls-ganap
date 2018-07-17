import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/ls-ganap-logo.png';
import homeIcon from '../assets/icon-home.png';
import searchIcon from '../assets/icon-search.png';
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
  width: 100%;
  height: 100px;

  font-family: sans-serif;
  text-transform: uppercase;

  @media all and (min-width: 480px) {
    border-top: solid 10px #C5A478;
  }
`;

const NavList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 100px;
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
  max-height: 50px;
`;

const Icon = styled(Image)`
  max-height: 25px;
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
              <MobileLink route="/">
                <Icon source={homeIcon} alt='Home Icon' />
              </MobileLink>
              <DesktopLogo route="/">
                <Logo source={logo} alt='LS Ganap Logo' />
              </DesktopLogo>
            </NavListItem>
            <NavListItem>
              <MobileLink route="/"><Logo source={logo} alt='LS Ganap Logo' /></MobileLink>
              <DesktopLink route="/">Home</DesktopLink>
            </NavListItem>
            <NavListItem>
              <MobileLink route="/">
                <Icon source={searchIcon} alt='Search Icon' />
              </MobileLink>
              <DesktopLink route="/browse">Browse</DesktopLink>
            </NavListItem>
          </NavList>
        </PageContent>
      </Nav>
    );
  }
}

export default MainNav;
