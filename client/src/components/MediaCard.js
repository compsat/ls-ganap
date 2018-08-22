import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from '../style/style-utils';

const Card = styled.article`
  display: flex;
  flex-direction: ${props => props.responsive ? 'row' : 'column'};
  height: 100%;
  border-radius: .3em;
  box-shadow: 0 .1em .6em rgba(0,0,0,.16);
  background: #fcfcfc;

  ${media.mdScreen`
    flex-direction: column;
  `}
`;

const CardImage = styled.div`
  width: 25%;
  background: url(${props => props.src}) center center;
  background-size: cover;

  ${media.mdScreen`
    width: 100%;
    padding-top: ${props => props.portrait ? '141%' : '100%'};
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
        responsive={this.props.responsive}
      >
        <CardImage
          role="img"
          aria-label={this.props.imgAlt}
          title={this.props.imgAlt}
          responsive={this.props.responsive}
          src={this.props.imgSrc}
          portrait={this.props.portrait}
        />
        <CardTextBox responsive={this.props.responsive}>
          {this.props.children}
        </CardTextBox>
      </Card>
    );
  }
}

export default MediaCard;
