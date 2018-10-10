import React, { Component } from 'react';
import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';
import AppBorder from '../components/AppBorder';
import AppText from '../components/AppText';
import { media } from '../style/style-utils';
import SVG from 'react-inlinesvg';

const SearchForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  ${media.mdScreen`
    flex-wrap: nowrap;
  `}
`

const SearchFieldContainer = AppBorder.extend.attrs({
  border: ['top', 'left', 'right'],
})`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${props => props.theme.colors.white};

  ${media.mdScreen`
    border-bottom-width: ${props => props.theme.sizes.borderWidth};
  `}
`

const SearchIcon = styled(SVG)`
  width: 1em;
  margin: 0 .75em;
`

const SearchField = AppText.withComponent(DebounceInput).extend.attrs({
  type: 'input'
})`
  width: 100%;
  min-height: 2em;
  border: none;
  background: none;
  outline: none;
`

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }
  }

  handleQueryChange = (e) => {
    const query = e.target.value;
    this.setState({query});
    this.props.onQueryChange({query});
  }

  render() {
    return (
      <SearchForm className={this.props.className}>
        <SearchFieldContainer>
          <SearchIcon src={require('../assets/icon-search.svg')}>
            <img
              src={require('../assets/icon-search.png')}
              alt="Search"
            />
          </SearchIcon>
          <SearchField
            value={this.state.query}
            onChange={this.handleQueryChange}
          />
        </SearchFieldContainer>
      </SearchForm>
    );
  }
}

export default SearchBar;