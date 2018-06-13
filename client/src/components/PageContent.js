import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
  max-width: ${props => props.width};
  margin: 0 auto;
`;

class PageContent extends Component {
  render() {
    return (
      <Wrapper width={this.props.width}>
        {this.props.children}
      </Wrapper>
    );
  }
}

export default PageContent;
