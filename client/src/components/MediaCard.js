import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from '../style/style-utils';

const Card = styled.article`
  display: flex;
  flex-direction: ${props => props.horizontal ? 'row' : 'column'};
  border-radius: .3em;
  box-shadow: 0 .1em .6em rgba(0,0,0,.16);
  background: #fcfcfc;
  max-width: 200px;

  ${media.mdScreen`
    width: 100%;
  `}
`;

const CardImage = styled.div`
  width: ${props => (props.horizontal ? "25%" : "100%")};
  min-width: 6em;
  background: url(${props => props.src}) center center;
  background-size: cover;

  ${media.mdScreen`
    min-width: 25%;
  `}
`;

const CardTextBox = styled.div`
  padding: 1em;
`;

class MediaCard extends Component {
  render() {
    return (
      <Card
        className={this.props.className}
        horizontal={this.props.horizontal}
      >
        <CardImage
          role="img"
          src={this.props.imgSrc}
          aria-label={this.props.imgAlt}
          title={this.props.imgAlt}
          horizontal={this.props.horizontal}
          portrait={this.props.portrait}
        />
        <CardTextBox horizontal={this.props.horizontal}>
          {this.props.children}
        </CardTextBox>
      </Card>
    );
  }
}

export default MediaCard;
