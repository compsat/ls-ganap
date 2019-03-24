import React, { Component } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";

import AppText from "components/common/AppText";
import Loading from "components/common/Loading";
import EventCard from "components/routes/browse/EventCard";
import EventCardContainer from "containers/EventCardContainer";
import FilterBarContainer from "containers/browse/FilterBarContainer";
import SearchBarContainer from "containers/browse/SearchBarContainer";
import { media } from "style/style-utils";

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

class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMounted: false
    };
  }

  componentDidMount() {
    this.props.fetchEventsBrowse({
      ...this.props.filters,
      page: 1
    });
    this.setState({ hasMounted: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filters === this.props.filters) return;

    this.props.fetchEventsBrowse({
      ...this.props.filters,
      page: 1
    });
  }

  loadMoreEvents = () => {
    if (!this.state.hasMounted) return;
    if (this.props.eventsBrowse.isFetching) return;

    this.props.fetchEventsBrowse({
      ...this.props.filters,
      page: this.props.eventsBrowse.page + 1
    });
  };

  render() {
    return (
      <main>
        <SearchHeader>
          <BrowseSearchBar />
        </SearchHeader>
        <MainContentBox>
          <BrowseFilterBar />
          <ResultsContainer>
            {this.props.eventsBrowse.hasInitiatedFetch &&
            !this.props.eventsBrowse.isFetching &&
            !this.props.eventsBrowse.result.length ? (
              <NoResultsP align="center">No events found.</NoResultsP>
            ) : !this.props.canDisplayEvents ? (
              <Loading />
            ) : (
              <InfiniteScroll
                loadMore={this.loadMoreEvents}
                hasMore={!this.props.eventsBrowse.failedToFetch}
                loader={<Loading />}
              >
                {this.props.eventsBrowse.result.map(id => (
                  <li key={id}>
                    <EventCardContainer component={EventCard} id={id} />
                  </li>
                ))}
              </InfiniteScroll>
            )}
          </ResultsContainer>
        </MainContentBox>
      </main>
    );
  }
}

export default Browse;
