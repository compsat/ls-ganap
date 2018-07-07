import styled from 'styled-components';

const PageContent = styled.main`
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  /* Consider removing calc from within media query */
  @media screen and (min-width: ${props => (parseInt(props.theme.maxSiteWidth) + 60 + 'px')}) {
    max-width: ${props => props.theme.maxSiteWidth};
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
  }
`;

export default PageContent;
