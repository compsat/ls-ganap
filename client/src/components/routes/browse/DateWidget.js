import React, { Component } from "react";
import styled from "styled-components";

import AppRadio from "components/common/AppRadio";
import WidgetContainer from "components/routes/browse/WidgetContainer";

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
  render() {
    return (
      <WidgetContainer>
        {this.props.dateRanges.map(date => (
          <DateWidgetChoice
            key={date}
            checked={this.props.activeDateRange.key === date}
          >
            <DateWidgetInput
              name="date"
              value={date}
              checked={this.props.activeDateRange.key === date}
              onChange={(e) => this.props.setDateRange(e.target.value)}
            />
            {date}
          </DateWidgetChoice>
        ))}
      </WidgetContainer>
    );
  }
}

export default DateWidget;
