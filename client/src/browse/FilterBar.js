import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import WidgetToggle from './WidgetToggle';
import HostWidget from './HostWidget';
import TagsWidget from './TagsWidget';
import DateWidget from './DateWidget';
import AppBorder from '../components/AppBorder';
import { media } from '../style/style-utils';

const FilterBarContainer = AppBorder.extend.attrs({
  border: ['top', 'bottom', 'right'],
})`
  position: relative;
  display: flex;
  width: 100%;
  min-width: 0;
  background: ${props => props.theme.colors.white};
`;

const BorderedWidgetToggle = AppBorder.withComponent(WidgetToggle);
const FilterBarWidgetToggle = BorderedWidgetToggle.extend.attrs({
  border: ['left'],
})`
  width: 100%;
  min-width: 0;
`;

class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFilter: '',
      host: '',
      tags: [],
      date: '',
    }
  }

  setFilterState = (state) => {
    this.props.onFiltersChange(state);
    this.setState(state);
  }

  handleWidgetToggle = (e, label) => {
    const checked = e.target.checked;
    const activeFilter = checked ? label : "";

    this.setState({activeFilter});
  }

  handleClickOutside = (e) => {
    this.setState({activeFilter: ''});
  }

  render() {
    return (
      <FilterBarContainer className={this.props.className}>
        <FilterBarWidgetToggle
          checked={this.state.activeFilter === 'Host'}
          toggleHandler={(e) => this.handleWidgetToggle(e, 'Host')}
          label="Host"
          value={this.state.host}
        >
          <HostWidget setHost={(host) => this.setFilterState({'host': host})}/>
        </FilterBarWidgetToggle>
        <FilterBarWidgetToggle
          checked={this.state.activeFilter === 'Tags'}
          toggleHandler={(e) => this.handleWidgetToggle(e, 'Tags')}
          label="Tags"
          value={this.state.tags}
        >
          <TagsWidget setTags={(tags) => this.setFilterState({'tags': tags})}/>
        </FilterBarWidgetToggle>
        <FilterBarWidgetToggle
          checked={this.state.activeFilter === 'Date'}
          toggleHandler={(e) => this.handleWidgetToggle(e, 'Date')}
          label="Date"
          value={this.state.date}
        >
          <DateWidget setDate={(date) => this.setFilterState({'date': date})}/>
        </FilterBarWidgetToggle>
      </FilterBarContainer>
    );
  }
}

export default onClickOutside(FilterBar);
