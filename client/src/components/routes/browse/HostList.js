import React, { Component } from 'react';
import styled from 'styled-components';
import InvisibleToggle from 'components/routes/browse/InvisibleToggle';
import AppRadio from 'components/common/AppRadio';

const List = styled.ul`
  margin-left: 1.5em;
`

class HostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeHost: "",
    };
  }

  handleItemClick = (e, item) => {
    const checked = e.target.checked;
    const activeHost = checked ? item : "";

    this.setState({ activeHost });
    this.props.setActiveHost(activeHost || this.props.parentActiveHost);
  }

  render() {
    return (
      <List className={this.props.className}>
        {this.props.item.map(item => (
          <li key={item.id}>
            <AppRadio checked={this.state.activeHost.name === item.name}>
              <InvisibleToggle
                checked={this.state.activeHost.name === item.name}
                onChange={(e) => this.handleItemClick(e, item)}
              />
              {item.name}
            </AppRadio>
            {this.state.activeHost.name === item.name && item.items && (
              <HostList
                item={item.items}
                parentActiveHost={this.state.activeHost}
                setActiveHost={this.props.setActiveHost}
              />
            )}
          </li>
        ))}
      </List>
    );
  }
}

export default HostList;
