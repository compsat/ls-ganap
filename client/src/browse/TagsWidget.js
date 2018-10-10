import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

import InvisibleToggle from './InvisibleToggle';
import WidgetContainer from './WidgetContainer';

const TagItem = styled.li`
  --tag-color: ${props => props.theme.colors.accent};

  display: inline-block;
  position: relative;
  padding: .5em .75em;
  border: ${props => props.theme.sizes.borderWidth} solid var(--tag-color);
  border-radius: .5em;
  margin-right: .5em;
  margin-bottom: .5em;
  background: ${props => props.active ? 'var(--tag-color)' : 'none'};
  color: ${props => props.active ? props.theme.colors.white : 'var(--tag-color)'};

  &:hover {
    background: var(--tag-color);
    color: ${props => props.theme.colors.white};
  }
`

class TagsWidget extends Component {
  componentDidMount() {
    this.props.fetchTags();
  }

  isTagActive = (tagId) => {
    return this.props.tags.find(tag => tag.id === tagId && tag.active);
  }
  
  render() {
    return (
      <WidgetContainer>
        <ul>
          {this.props.tags.map((tag) =>
            <TagItem
              key={tag.id}
              active={this.isTagActive(tag.id)}
            >
              {tag.name}
              <InvisibleToggle
                checked={this.isTagActive(tag.id)}
                onChange={() => this.props.toggleTag(tag.id)}
              />
            </TagItem>
          )}
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
