import styled from 'styled-components';

const PageContent = styled.div`
  height: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  @media screen and (min-width: ${props => (parseInt(props.theme.sizes.maxSiteWidth) + 60)/16}em) {
    max-width: ${props => props.theme.sizes.maxSiteWidth};
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
  }
`;

export default PageContent;
