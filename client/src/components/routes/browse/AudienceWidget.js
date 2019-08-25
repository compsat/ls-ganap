import React, { Component } from "react";
import styled from "styled-components";

import AppRadio from "components/common/AppRadio";
import WidgetContainer from "components/routes/browse/WidgetContainer";
import InvisibleToggle from "components/routes/browse/InvisibleToggle";

const AudienceWidgetChoice = AppRadio.extend`
  display: block;
`;

const AudienceWidgetInput = styled.input.attrs({
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

class AudienceWidget extends Component {
  componentDidMount() {
    this.props.fetchAudiences();
  }

  render() {
    const audiences = [{value: "", name: "All"}].concat(Object.values(this.props.audiences));

    return (
      <WidgetContainer>
        {audiences.map(audience => (
          <AudienceWidgetChoice
            key={audience.value}
            checked={this.props.activeAudience === audience.value}
          >
            <AudienceWidgetInput
              name="audience"
              value={audience.value}
              checked={this.props.activeAudience.value === audience.value}
              onChange={(e) => this.props.selectAudience(e.target.value)}
            />
            {audience.name}
          </AudienceWidgetChoice>
        ))}
      </WidgetContainer>
    );
  }
}

export default AudienceWidget;
