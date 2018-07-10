import React, { Component } from 'react';
import styled from 'styled-components';

const Card = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: .3em;
  box-shadow: 0 .1em .6em rgba(0,0,0,.16);
  background: #fcfcfc;
`;

const CardImage = styled.img`
  width: 100%;
`;

const CardTextBox = styled.div`
  flex-grow: 1;
  padding: 1em;
`;

class MediaCard extends Component {
  render() {
    return (
      <Card>
        <CardImage src={this.props.imgSrc} alt={this.props.imgAlt} />
        <CardTextBox>
          {this.props.children}
        </CardTextBox>
      </Card>
    );
  }
}

export default MediaCard;
