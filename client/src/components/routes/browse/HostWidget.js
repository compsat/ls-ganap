import React, { Component } from "react";
import styled from "styled-components";

import HostList from "components/routes/browse/HostList";
import WidgetContainer from "components/routes/browse/WidgetContainer";

const HostWidgetList = styled(HostList)`
  margin-left: 0;
`;

class HostFilterWidget extends Component {
  setWidgetState = host => {
    this.props.selectHost(host);
  };

  componentDidMount = () => {
    this.props.fetchHosts();
  };

  render() {
    return (
      <WidgetContainer>
        <HostWidgetList
          item={this.props.hosts}
          parentActiveHost=""
          setActiveHost={this.props.selectHost}
        />
      </WidgetContainer>
    );
  }
}

export default HostFilterWidget;
