import React, { Component } from 'react';
import styled from 'styled-components';
import InvisibleToggle from './InvisibleToggle';
import AppSubheading from '../components/AppSubheading';
import { media } from '../style/style-utils';
import SVG from 'react-inlinesvg';

const WidgetToggleContainer = styled.fieldset`

`

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: .5em;
`

const WidgetToggleTextContainer = styled.div`
  min-width: 0;
`

const WidgetToggleLegend = AppSubheading.withComponent('legend').extend.attrs({
  size: -2,
})`
  text-transform: uppercase;
  letter-spacing: .1em;
  color: ${props => props.theme.colors.accent};
`

const WidgetToggleValue = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArrowIcon = styled(SVG)`
  min-width: .5em;
  margin: 0 .5em;
  transform: ${props => props.checked ? 'rotate(-90deg)' : 'rotate(90deg)'};
  pointer-events: none;
`

const TogglableWidget = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  width: calc(100% + ${props => props.theme.sizes.borderWidth});
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
`

class WidgetToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    }
  }

  render() {
    return (
      <WidgetToggleContainer className={this.props.className}>
        <ToggleContainer>
          <InvisibleToggle
            checked={this.props.checked}
            onChange={this.props.toggleHandler}
          />
          <WidgetToggleTextContainer>
            <WidgetToggleLegend>{this.props.label}</WidgetToggleLegend>
            <WidgetToggleValue>{this.props.value}</WidgetToggleValue>
          </WidgetToggleTextContainer>
          <ArrowIcon
            checked={this.props.checked}
            src={require('../assets/icon-arrow.svg')}>
            <img
              src={require('../assets/icon-arrow.png')}
              alt="Arrow"
            />
          </ArrowIcon>
        </ToggleContainer>
        <TogglableWidget visible={this.props.checked}>
          {this.props.children}
        </TogglableWidget>
      </WidgetToggleContainer>
    );
  }
}

export default WidgetToggle;
