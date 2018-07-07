import React, { Component } from 'react';
import styled from 'styled-components';

const PageContent = styled.main`
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  /* Consider removing calc from within media query */
  @media screen and (min-width: calc(${props => props.theme.width} + 60px)) {
    max-width: ${props => props.theme.width};
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
  }
`;

PageContent.defaultProps = {
  theme: {
    width: '1200px'
  }
}

export default PageContent;
