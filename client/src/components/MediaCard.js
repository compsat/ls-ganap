import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from '../style/style-utils';

const Card = styled.article`
  display: flex;
  flex-direction: ${props => props.horizontal ? 'row' : 'column'};
  height: 100%;
  border-radius: .3em;
  box-shadow: 0 .1em .6em rgba(0,0,0,.16);
  background: #fcfcfc;
`;

const CardImageBox = styled.div`
  position: relative;
  overflow: hidden;
  border-top-left-radius: .3em;
  border-bottom-left-radius: .3em;
  background: #000;
`;

const CardImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${props => props.src}) center center;
  background-size: cover;
`;

const CardImageHelper = styled.img`
  min-height: 100%;
  visibility: hidden;

  ${media.mdScreen`
    ${props => !props.horizontal && `width: 100%;`}
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
        <CardImageBox>
          <CardImage
            role="img"
            src={this.props.imgSrc}
            aria-label={this.props.imgAlt}
            title={this.props.imgAlt}
            horizontal={this.props.horizontal}
            portrait={this.props.portrait}
          />
          <CardImageHelper
            horizontal={this.props.horizontal}
            src={this.props.portrait
              ? "https://placeimg.com/10/14/any?t=1536502711150"
              : "https://placeimg.com/10/10/any?t=1536502711150"
            }
            alt=""
          />
        </CardImageBox>
        <CardTextBox horizontal={this.props.horizontal}>
          {this.props.children}
        </CardTextBox>
      </Card>
    );
  }
}

export default MediaCard;
