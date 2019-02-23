import React, { Component } from 'react';
import styled from 'styled-components';
import InvisibleToggle from 'components/routes/browse/InvisibleToggle';
import AppBorder from 'components/common/AppBorder';
import AppSubheading from 'components/common/AppSubheading';
import { media } from 'style/style-utils';
import SVG from 'react-inlinesvg';

const WidgetToggleContainer = styled.fieldset`

`

const ToggleContainer = AppBorder.extend`
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
  size: -1,
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

  ${media.mdScreen`
    display: none;
  `}
`

const TogglableWidget = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  width: 100%;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};

  ${media.mdScreen`
    position: relative;
    visibility: visible;
  `}
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
            <WidgetToggleValue>
              {this.props.value || "All"}
            </WidgetToggleValue>
          </WidgetToggleTextContainer>
          <ArrowIcon
            checked={this.props.checked}
            src={require('assets/icon-arrow.svg')}>
            <img
              src={require('assets/icon-arrow.png')}
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
