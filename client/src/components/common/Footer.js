import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import ateneoLogo from "assets/ateneo-logo.png"
import cemWhiteLogo from "assets/cem-logo-white.png"
import compsatLogo from "assets/compsat-logo.svg"
import PageContent from "components/common/PageContent"
import { media } from "style/style-utils"

const FooterLink = ({ className, route, children }) => (
  <Link className={className} to={route}>
    {children}
  </Link>
)

const Image = ({ className, source, alt }) => (
  <img className={className} src={source} alt={alt} />
)

const StyledFooter = styled.footer`
  min-height: 8em;
  padding: 2.5em 0;
  background-color: #f9f9f9;

  display: flex;
  align-items: center;
  z-index: 999;

  border-bottom: solid 10px #c5a478;

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
  max-height: 3em;
  max-width: 11em;
  width: auto;
  margin-top: 2em;
  text-align: center;

  ${media.mdScreen`
    margin-top: 0;
    max-height: 2.4em;
    align-self: flex-start;
  `}
`

const CEMLogo = styled(Logo)`
  margin-left: 1em;
  mix-blend-mode: multiply;
  max-height: 4em;
  align-self: center;
  position: relative;
  top: 15px;
`
const AteneoLogo = styled(Logo)`
  order: 1;
`
const CompSAtLogo = styled(Logo)`
  max-height: 3em;
  max-width: 11em;
  margin-left: 2em;
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
  align-items: center;
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
            <AteneoLogo source={ateneoLogo} alt="Ateneo Logo" />
            <CEMLogo source={cemWhiteLogo} alt="LS Ganap Logo" />
            <CompSAtLogo source={compsatLogo} alt="CompSAt Logo" />
          </LogosContainer>
          <LinksContainer>
            <StyledFooterLink route="/">About</StyledFooterLink>
            <StyledFooterLink route="/">Contact Us</StyledFooterLink>
          </LinksContainer>
        </StyledPageContent>
      </StyledFooter>
    )
  }
}

export default Footer
