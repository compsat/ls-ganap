import React, { Component } from 'react';
import styled from 'styled-components';

const ArrowIcon = styled.div`
  width: 1.5em;
  height: 1.5em;
  border-left: 1px solid
    ${props => props.theme.arrowColor ? props.theme.arrowColor : 'black'};
  border-bottom: 1px solid
    ${props => props.theme.arrowColor ? props.theme.arrowColor : 'black'};
  transform: translateX(${Math.sqrt(2)*1.5/4}em) scaleY(1.1) rotate(45deg);
`

const Button = styled.button`
  display: inline-block;
  padding: 1em;
  background: none;
  border: none;
  cursor: pointer;
  transform: ${props => props.reverse ? '' : 'rotate(180deg)'};
`
class ArrowButton extends Component {
  render() {
    return (
      <Button className={this.props.className} onClick={this.props.onClick} reverse={this.props.reverse}>
        <ArrowIcon />
      </Button>
    );
  }
}

export default ArrowButton;
