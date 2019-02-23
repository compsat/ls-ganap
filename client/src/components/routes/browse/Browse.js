import React, { Component } from "react";
import styled from "styled-components";
import { media } from "style/style-utils";
import InfiniteScroll from "react-infinite-scroller";

import SearchBarContainer from "containers/browse//SearchBarContainer";
import FilterBarContainer from "containers/browse//FilterBarContainer";
import AppText from "components/common/AppText";
import EventCardContainer from "containers/browse//EventCardContainer";
import Loading from 'components/common/Loading';

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
                  loader={<Loading />}
                >
                  {this.props.entities.events.items.map(event => (
                    <li key={event.id}>
                      <EventCardContainer event={event} />
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
