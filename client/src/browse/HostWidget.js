import React, { Component } from 'react';
import styled from 'styled-components';
import HostList from './HostList';
import WidgetContainer from './WidgetContainer';

const HostWidgetList = styled(HostList)`
  margin-left: 0;
`

class HostFilterWidget extends Component {
  setWidgetState = (hostName) => {
    this.props.selectHost(hostName);
  }

  componentDidMount = () => {
    this.props.fetchHosts();
  }

  render() {
    return (
      <WidgetContainer>
        <HostWidgetList
          item={this.props.hosts}
          parentActiveHost=""
          setActiveHost={this.setWidgetState}
        />
      </WidgetContainer>
    );
  }
}

export default HostFilterWidget;