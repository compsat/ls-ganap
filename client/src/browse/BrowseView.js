import React, { Component } from "react";
import styled from "styled-components";
import { media } from "../style/style-utils";
import InfiniteScroll from "react-infinite-scroller";
import SVG from "react-inlinesvg";

import SearchBarContainer from "../containers/SearchBarContainer";
import FilterBarContainer from "../containers/FilterBarContainer";
import AppText from "../components/AppText";
import BrowseEventCardContainer from "../containers/BrowseEventCardContainer";

const SearchHeader = styled.header`
  ${media.mdScreen`
    margin-top: 3em;
    margin-bottom: 4em;
  `}
`;

const BrowseSearchBar = styled(SearchBarContainer)`
  ${media.mdScreen`
    width: 28em;
    margin: 0 auto;
  `}
`;

const MainContentBox = styled.div`
  ${media.mdScreen`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  `}
`;

const BrowseFilterBar = styled(FilterBarContainer)`
  margin-bottom: 1em;

  ${media.mdScreen`
    flex-direction: column;
    width: 16em;
    min-width: 16em;
    margin-right: 2em;
  `}
`;

const ResultsContainer = styled.div`
  flex-grow: 1;
  list-style-type: none;
`;

const NoResultsP = AppText.withComponent("p");

const SpinnerIcon = styled(SVG)`
  display: block;
  width: 2em;
  margin: 0 auto;
`;

class BrowseView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMounted: false,
    };
  }

  componentDidMount() {
    this.props.fetchVenues();
    this.props.fetchEvents({
      ...this.props.filters,
      page: 1,
    });
    this.setState({ hasMounted: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filters === this.props.filters) return;

    this.props.fetchEvents({
      ...this.props.filters,
      page: 1,
    });
  }

  loadMoreEvents = () => {
    if (!this.state.hasMounted) return;
    if (this.props.entities.events.isFetching) return;

    this.props.fetchEvents({
      ...this.props.filters,
      page: this.props.entities.events.page + 1,
    });
  }

  render() {
    return (
      <main>
        <SearchHeader>
          <BrowseSearchBar />
        </SearchHeader>
        <MainContentBox>
          <BrowseFilterBar />
          <ResultsContainer>
            {this.props.entities.events.isFetching ||
              this.props.entities.events.items.length > 0
              ? (
                <InfiniteScroll
                  loadMore={this.loadMoreEvents}
                  hasMore={!this.props.entities.events.failedToFetch}
                  loader={<SpinnerIcon src={require("../assets/icon-spinner.svg")} />}
                >
                  {this.props.entities.events.items.map(event => (
                    <li key={event.id}>
                      <BrowseEventCardContainer event={event} />
                    </li>
                  ))}
                </InfiniteScroll>
              ) : (
                <NoResultsP align="center">No events found.</NoResultsP>
              )
            }
          </ResultsContainer>
        </MainContentBox>
      </main>
    );
  }
}

export default BrowseView;