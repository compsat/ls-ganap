import React, { Component } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import FilterBarContainer from "../containers/FilterBarContainer";
import MediaCard from "../components/MediaCard";
import AppSubheading from "../components/AppSubheading";
import AppText from "../components/AppText";
import { media } from "../style/style-utils";
import SVG from "react-inlinesvg";

const SearchHeader = styled.header`
  ${media.mdScreen`
    margin-top: 3em;
    margin-bottom: 4em;
  `}
`;

const BrowseSearchBar = styled(SearchBar)`
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

const EventItemList = styled.ul`
  flex-grow: 1;
`;

const SpinnerIcon = styled(SVG)`
  display: block;
  width: 2em;
  margin: 0 auto;
`;

const BrowseMediaCard = styled(MediaCard)`
  min-height: 12em;
  margin-bottom: 1em;
`;

const MediaCardHostP = AppText.withComponent("p").extend`
  margin-bottom: 1em;
`;

class BrowseView extends Component {
  componentDidMount() {
    this.props.fetchVenues();
    this.props.fetchEvents();
  }

  getItemProp = (arr, id, prop, fallbackValue) => {
    const item = arr.find(item => item.id === id);

    return item ? item[prop] : fallbackValue;
  };

  formatHosts = hostIds => {
    const hostNames = hostIds.map(hostId =>
      this.getItemProp(this.props.hosts.items, hostId, "name")
    );

    return `Hosted by ${hostNames[0]} and ${hostNames.length -
      1} other${hostNames.length - 1 > 1 && "s"}`;
  };

  formatDate(date) {
    const dateObject = new Date(date);
    const dateString = dateObject.toDateString().substr(4);

    return dateString.replace(/ (?=[^ ]*$)/, ", ");
  }

  formatTime(time) {
    const [hours, mins] = time.split(":");
    const timeStringOptions = {
      hour12: true,
      hour: "numeric",
      minute: "2-digit"
    };
    const timeContainer = new Date();

    timeContainer.setHours(hours, mins);

    return timeContainer.toLocaleTimeString("en-US", timeStringOptions);
  }

  render() {
    return (
      <main>
        <SearchHeader>
          <BrowseSearchBar />
        </SearchHeader>
        <MainContentBox>
          <BrowseFilterBar />
          {!this.props.events.isFetching ? (
            <EventItemList>
              {this.props.events.items.map(event => (
                <li key={event.id}>
                  <BrowseMediaCard
                    portrait
                    horizontal
                    imgSrc={event.poster_url}
                    imgAlt={event.name}
                  >
                    <AppSubheading size="1">{event.name}</AppSubheading>
                    <MediaCardHostP>
                      {this.formatHosts([
                        ...event.org_hosts,
                        ...event.office_hosts,
                        ...event.sanggu_hosts
                      ])}
                    </MediaCardHostP>
                    <p>{this.formatDate(event.event_logistics[0].date)}</p>
                    <p>
                      {this.formatTime(event.event_logistics[0].start_time)}
                    </p>
                    <p>
                      {this.getItemProp(
                        this.props.venues.items,
                        event.event_logistics[0].venue,
                        "name",
                        event.event_logistics[0].outside_venue_name
                      )}
                    </p>
                  </BrowseMediaCard>
                </li>
              ))}
            </EventItemList>
          ) : (
            <SpinnerIcon src={require("../assets/icon-spinner.svg")} />
          )}
        </MainContentBox>
      </main>
    );
  }
}

export default BrowseView;
