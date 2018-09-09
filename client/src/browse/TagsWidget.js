import React, { Component } from 'react';
import styled from 'styled-components';
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
  constructor(props) {
    super(props)

    this.state = {
      tags: {}
    }
    this.props.setTags('All');
  }

  setWidgetState = (tags) => {
    this.setState({tags});

    let displayTags = Object.entries(tags).filter(
      ([key, val]) => val).map(([key, val]) => key);
    displayTags = displayTags.length ? displayTags : 'All';
    this.props.setTags(displayTags);
  }

  componentDidMount() {
    const tags = [
      'Business',
      'Science & Tech',
      'Family & Education',
      'Spirituality',
      'Other',
      'Governement',
      'Hobbies',
      'Music',
      'Film & Media',
      'Health',
      'Community',
      'Fashion',
      'Travel & Outdoor',
      'Food & Drink',
      'Charity & Causes',
      'Home & Lifestyle',
      'School Activities',
    ];
    const tagsObject = tags.reduce((obj, tag) => {
      obj[tag] = false;
      return obj;
    }, {});

    this.setWidgetState(tagsObject);
  }

  handleToggle = (e, tag) => {
    const tagsObject = {
      ...this.state.tags,
      [tag]: e.target.checked,
    };

    this.setWidgetState(tagsObject);
  }

  render() {
    return (
      <WidgetContainer>
        <ul>
          {Object.keys(this.state.tags).map((tag) =>
            <TagItem active={this.state.tags[tag]}>
              {tag}
              <InvisibleToggle
                checked={this.state.tags[tag]}
                onChange={(e) => this.handleToggle(e, tag)}
              />
            </TagItem>
          )}
        </ul>
      </WidgetContainer>
    );
  }
}

export default TagsWidget;