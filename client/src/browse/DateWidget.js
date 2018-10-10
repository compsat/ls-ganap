import React, { Component } from "react";
import styled from "styled-components";
import WidgetContainer from "./WidgetContainer";
import AppRadio from "../components/AppRadio";

const DateWidgetChoice = AppRadio.extend`
  display: block;
`;

const DateWidgetInput = styled.input.attrs({
  type: "radio"
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
    this.dateRanges = ["All", "Today", "This Week", "This Month"];
  }

  handleChoiceClick = e => {
    const date = e.target.value;
    this.props.selectDateRange(date);
  };

  render() {
    return (
      <WidgetContainer>
        {this.dateRanges.map(date => (
          <DateWidgetChoice
            key={date}
            checked={this.props.dates === date}
          >
            <DateWidgetInput
              name="date"
              value={date}
              checked={this.props.dates === date}
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
