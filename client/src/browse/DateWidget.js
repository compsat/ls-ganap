import React, { Component } from 'react';
import styled from 'styled-components';
import WidgetContainer from './WidgetContainer';
import AppRadio from '../components/AppRadio';

const DateWidgetChoice = AppRadio.extend`
  display: block;
`;

const DateWidgetInput = styled.input.attrs({
  type: 'radio',
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
`;

class DateWidget extends Component {
  constructor(props) {
    super(props);
    this.dateChoices = [
      'All',
      'Today',
      'This Week',
      'This Month',
      'After this Month',
    ];

    const initialDate = this.dateChoices[0];

    this.state = {
      date: initialDate,
    };
    this.props.setDate(initialDate);
  }

  setWidgetState = (date) => {
    this.setState({date});
    this.props.setDate(date);
  }

  handleChoiceClick = (e) => {
    const date = e.target.value;
    this.setWidgetState(date);
  }

  render() {
    return (
      <WidgetContainer>
        {this.dateChoices.map((date) => (
          <DateWidgetChoice checked={this.state.date === date}>
            <DateWidgetInput
              name="date"
              value={date}
              checked={this.state.date === date}
              onChange={this.handleChoiceClick}
            />
            {date}
          </DateWidgetChoice>
        ))}
      </WidgetContainer>
    );
  }
}

export default DateWidget;
