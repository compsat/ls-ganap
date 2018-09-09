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

  is(type, item) {
    return !!item && item.constructor === type;
  }

  render() {
    const item = this.props.item;
    const is = this.is;

    return (
      <React.Fragment>
      {is(Object, item) ? (
        <List className={this.props.className}>
        {Object.entries(item).map(([key, value]) =>
          <li>
            <AppRadio checked={this.state.activeHost === key}>
              <InvisibleToggle
                checked={this.state.activeHost === key}
                onChange={(e) => this.handleItemClick(e, key)}
              />
              {key}
            </AppRadio>
            {this.state.activeHost === key &&
              <HostList
                item={value}
                parentActiveHost={this.state.activeHost}
                setActiveHost={this.props.setActiveHost}
              />
            }
          </li>
        )}
        </List>
      ) : is(Array, item) ? (
        <List className={this.props.className}>
        {item.map(value =>
          <HostList
            item={value}
            parentActiveHost={this.props.parentActiveHost}
            setActiveHost={this.props.setActiveHost}
          />
        )}
        </List>
      ) : (
        <li>
          <AppRadio checked={this.state.activeHost === item}>
            <InvisibleToggle
              checked={this.state.activeHost === item}
              onChange={(e) => this.handleItemClick(e, item)}
            />
            {item}
          </AppRadio>
        </li>
      )}
      </React.Fragment>
    );
  }
}

export default HostList;
