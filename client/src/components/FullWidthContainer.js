import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-left: calc((100% - 100vw)/2);
  margin-right: calc((100% - 100vw)/2);
`

class FullWidthContainer extends Component {
  render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    );
  }
}

export default FullWidthContainer;
