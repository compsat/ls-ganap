import React, { Component } from "react";
import styled from "styled-components";
import onClickOutside from "react-onclickoutside";

import AppBorder from "components/common/AppBorder";
import WidgetToggle from "components/routes/browse/WidgetToggle";
import HostWidgetContainer from "containers/browse/HostWidgetContainer";
import TagsWidgetContainer from "containers/browse/TagsWidgetContainer";
import DateWidgetContainer from "containers/browse/DateWidgetContainer";
import AudienceWidgetContainer from "containers/browse/AudienceWidgetContainer";

const FilterBarContainer = AppBorder.extend`
  position: relative;
  display: flex;
  width: 100%;
  min-width: 0;
  background: ${props => props.theme.colors.white};
`;

const FilterBarWidgetToggle = styled(WidgetToggle)`
  width: 100%;
  min-width: 0;
`;

class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFilter: "",
      host: "",
      tags: [],
      date: ""
    };
  }

  setFilterState = state => {
    this.props.onFiltersChange(state);
    this.setState(state);
  };

  handleWidgetToggle = (e, label) => {
    const checked = e.target.checked;
    const activeFilter = checked ? label : "";

    this.setState({ activeFilter });
  };

  handleClickOutside = e => {
    this.setState({ activeFilter: "" });
  };

  render() {
    return (
      <FilterBarContainer className={this.props.className}>
        <FilterBarWidgetToggle
          checked={this.state.activeFilter === "Audience"}
          toggleHandler={e => this.handleWidgetToggle(e, "Audience")}
          label="Audience"
          value={this.props.audience}
        >
          <AudienceWidgetContainer />
        </FilterBarWidgetToggle>
        <FilterBarWidgetToggle
          checked={this.state.activeFilter === "Host"}
          toggleHandler={e => this.handleWidgetToggle(e, "Host")}
          label="Host"
          value={this.props.host}
        >
          <HostWidgetContainer />
        </FilterBarWidgetToggle>
        <FilterBarWidgetToggle
          checked={this.state.activeFilter === "Tags"}
          toggleHandler={e => this.handleWidgetToggle(e, "Tags")}
          label="Tags"
          value={this.props.tags}
        >
          <TagsWidgetContainer />
        </FilterBarWidgetToggle>
        <FilterBarWidgetToggle
          checked={this.state.activeFilter === "Date"}
          toggleHandler={e => this.handleWidgetToggle(e, "Date")}
          label="Date"
          value={this.props.dateRange}
        >
          <DateWidgetContainer />
        </FilterBarWidgetToggle>
      </FilterBarContainer>
    );
  }
}

export default onClickOutside(FilterBar);
