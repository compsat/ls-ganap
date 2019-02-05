import React, { Component } from "react";
import styled from "styled-components";
import MediaCard from "../components/MediaCard";
import AppSubheading from "../components/AppSubheading";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

const BrowseMediaCard = styled(MediaCard)`
  min-height: 12em;
  margin-bottom: 1em;
`;

const MarginAfterP = AppText.withComponent("p").extend`
  margin-bottom: 1em;
`;

const AppButtonAnchor = AppButton.withComponent("a").extend`
  text-decoration: none;
`;

class BrowseEventCard extends Component {
  getItemProp = (arr, id, prop, fallbackValue) => {
    const item = arr.find(item => item.id === id);
    return item ? item[prop] : fallbackValue;
  };

  formatHosts = hostIds => {
    const hostNames = hostIds.map(hostId =>
      this.getItemProp(this.props.hosts, hostId, "name")
    );
    let hostsString = `Hosted by ${hostNames[0]}`;

    if (hostNames.length > 1) {
      hostsString += ` and ${hostNames.length -
      1} other${hostNames.length - 1 > 1 ? "s" : ""}`;
    }

    return hostsString;
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
      <BrowseMediaCard
        portrait
        horizontal
        imgSrc={this.props.event.poster_url}
        imgAlt={this.props.event.name}
      >
        <AppSubheading size="2">{this.props.event.name}</AppSubheading>
        <MarginAfterP size="0">
          {this.formatHosts([
            ...this.props.event.org_hosts,
            ...this.props.event.office_hosts,
            ...this.props.event.sanggu_hosts
          ])}
        </MarginAfterP>
        <p>{this.formatDate(this.props.event.event_logistics[0].date)}</p>
        <p>
          {this.formatTime(this.props.event.event_logistics[0].start_time)}
        </p>
        <MarginAfterP>
          {this.getItemProp(
            this.props.venues,
            this.props.event.event_logistics[0].venue,
            "name",
            this.props.event.event_logistics[0].outside_venue_name
          )}
        </MarginAfterP>
        <AppButtonAnchor
          href={`${process.env.REACT_APP_API_URL}gcal/events/${
            this.props.event.id
          }`}
        >Add to Calendar</AppButtonAnchor>
        <AppButton>Read More</AppButton>
      </BrowseMediaCard>
    );
  }
}

export default BrowseEventCard;
