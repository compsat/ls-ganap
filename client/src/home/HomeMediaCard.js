import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from '../style/style-utils';

const Card = styled.article`
  display: flex;
  flex-direction: ${props => props.horizontal ? 'row' : 'column'};
  border-radius: .3em;
  box-shadow: 0 .1em .6em rgba(0,0,0,.16);
  background: #fcfcfc;
  width: 200px;

  ${media.mdScreen`
    width: 100%;
  `}
`;

const CardImageContainer = styled.div`
  padding: 2px;
  height: ${props => props.src ? props.imgHeight : 'auto'};;

  ${media.mdScreen`
    height: ${props => props.src ? props.imgHeight : 'auto'};;
  `}
`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CardTextBox = styled.div`
  padding: 1em;
`;

class HomeMediaCard extends Component {
  render() {
    return (
      <Card>
        <CardImageContainer src={this.props.imgSrc} imgHeight={this.props.imgHeight}>
          <CardImage src={this.props.imgSrc} alt={this.props.imgAlt} />
        </CardImageContainer>
        <CardTextBox>
          {this.props.children}
        </CardTextBox>
      </Card>
    );
  }
}

export default HomeMediaCard;
