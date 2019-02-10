import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from '../style/style-utils';
import PageContent from './PageContent';
import lsGanapLogo from '../assets/ls-ganap-logo.svg';
import ateneoLogo from '../assets/ateneo-logo.png';

const FooterLink = ({className, route, children}) => (
  <Link className={className} to={route}>{children}</Link>
)

const Image = ({className, source, alt}) => (
  <img className={className} src={source} alt={alt}/>
)

const StyledFooter = styled.footer`
  min-height: 8em;
  padding: 2.5em 0;
  background-color: #F9F9F9;

  display: flex;
  align-items: center;

  border-bottom: solid 10px #C5A478;

  ${media.mdScreen`
    padding: 4em 0;
  `}
`

const StyledPageContent = styled(PageContent)`
  display: grid;
  height: auto;

  ${media.mdScreen`
    grid-template-columns: 1fr 7em;
  `}
`

const StyledFooterLink = styled(FooterLink)`
  text-decoration: none;
  color: black;
`

const Logo = styled(Image)`
  max-height: 2.5em;
  max-width: 11em;
  width: auto;
  margin-top: 1em;
  text-align:center;

  ${media.mdScreen`
    margin-top: 0;
    max-height: 2.4em;
    align-self: flex-start;
  `}
`;

const LSGanapLogo = styled(Logo)``
const AteneoLogo = styled(Logo)`
  order: 1;
`

const LinksContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1em;
  text-align: center;

  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.8em;

  ${media.mdScreen`
    font-family: 'Quatro Sans';
    font-weight: 600;
    font-size: .8em;

    text-transform: none;
    letter-spacing: 0;

    text-align: right
    grid-gap: .2em; 
  `}
`

const LogosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  width: 100%;
  grid-row-start: 2;
  grid-row-end: 3;

  ${media.mdScreen`
    display:inline-block;
    margin-top: 0em;
    grid-row-start: 1;
    grid-row-end: 1;
  `}
`

class Footer extends Component {
  render() {
    return (
      <StyledFooter>
        <StyledPageContent>
          <LogosContainer>
            <AteneoLogo source={ateneoLogo} alt='Ateneo Logo' />
            <LSGanapLogo source={lsGanapLogo} alt='LS Ganap Logo' />
          </LogosContainer>
          <LinksContainer>
            <StyledFooterLink route="/">About</StyledFooterLink>
            <StyledFooterLink route="/">Contact Us</StyledFooterLink>
          </LinksContainer>
        </StyledPageContent>
      </StyledFooter>
    );
  }
}

export default Footer;
