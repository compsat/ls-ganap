import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

import InvisibleToggle from './InvisibleToggle';
import WidgetContainer from './WidgetContainer';
import AppButton from "../common/AppButton";

const TagLi = styled.li`
  display: inline-block;
  position: relative;
`;

class TagsWidget extends Component {
  componentDidMount() {
    this.props.fetchTags();
  }

  isTagActive = (tagId) => {
    return this.props.activeTags.includes(tagId);
  }

  render() {
    return (
      <WidgetContainer>
        <ul>
          {this.props.tags.map(tag => (
            <TagLi key={tag.id}>
              <AppButton active={this.isTagActive(tag.id)}>
                {tag.name}
                <InvisibleToggle
                  checked={this.isTagActive(tag.id)}
                  onChange={() => this.props.toggleTag(tag.id)}
                />
              </AppButton>
            </TagLi>
          ))}
        </ul>
      </WidgetContainer>
    );
  }
}

TagsWidget.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  toggleTag: PropTypes.func.isRequired,
  fetchTags: PropTypes.func.isRequired
}

export default TagsWidget;
