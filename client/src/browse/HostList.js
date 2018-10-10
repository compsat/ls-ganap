import React, { Component } from 'react';
import styled from 'styled-components';
import InvisibleToggle from './InvisibleToggle';
import AppRadio from '../components/AppRadio';

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

    this.setState({activeHost});
    this.props.setActiveHost(activeHost || this.props.parentActiveHost);
  }

  render() {
    return (
      <List className={this.props.className}>
        {this.props.item.map(item => (
          <li key={item.id}>
            <AppRadio checked={this.state.activeHost === item.name}>
              <InvisibleToggle
                checked={this.state.activeHost === item.name}
                onChange={(e) => this.handleItemClick(e, item.name)}
              />
              {item.name}
            </AppRadio>
            {this.state.activeHost === item.name && item.items && (
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
