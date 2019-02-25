import React, { Component } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import AppText from "components/common/AppText";
import InvisibleToggle from "components/routes/browse/InvisibleToggle";
import WidgetContainer from "components/routes/browse/WidgetContainer";
import theme from "style/style-theme";

const TagLi = styled.li`
  display: inline-block;
  position: relative;
`;

const TagButtonActive = css`
  background: ${theme.colors.accent};
  color: ${theme.colors.white};
`;

const TagButton = AppText.withComponent("button").extend`
  display: inline-block;
  padding-top: .3em;
  padding-right: .66em;
  padding-left: .66em;
  padding-bottom: .35em;
  border-width: ${props => props.theme.sizes.borderWidth};
  border-style: solid;
  border-color: ${props => props.theme.colors.accent};
  border-radius: .5em;
  margin-right: .5em;
  margin-bottom: .5em;
  background: none;
  color: ${props => props.theme.colors.accent};
  outline: none;
  cursor: pointer;

  &:hover { ${TagButtonActive} }
  ${props => props.active && TagButtonActive}
`;

class TagsWidget extends Component {
  componentDidMount() {
    this.props.fetchTags();
  }

  isTagActive = tagId => {
    return this.props.activeTags.includes(tagId);
  };

  render() {
    return (
      <WidgetContainer>
        <ul>
          {Object.values(this.props.tags).map(tag => (
            <TagLi key={tag.id}>
              <TagButton active={this.isTagActive(tag.id)}>
                {tag.name}
                <InvisibleToggle
                  checked={this.isTagActive(tag.id)}
                  onChange={() => this.props.toggleTag(tag.id)}
                />
              </TagButton>
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
      active: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  toggleTag: PropTypes.func.isRequired,
  fetchTags: PropTypes.func.isRequired
};

export default TagsWidget;
