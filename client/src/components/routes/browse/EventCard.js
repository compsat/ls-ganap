import React, { Component } from "react";
import styled from "styled-components";
import { media } from 'style/style-utils';
import AppCard from 'components/common/AppCard';
import AppCardBase from 'components/common/AppCardBase';
import AppCardImage from 'components/common/AppCardImage';
import AppCardTextBox from 'components/common/AppCardTextBox';
import AppSubheading from "components/common/AppSubheading";
import AppText from "components/common/AppText";
import AppButton from "components/common/AppButton";

const EventCardBase = styled(AppCardBase)`
  display: flex;
  flex-direction: row;
  min-height: 12em;
  margin-bottom: 1em;
`;

const EventCardImage = styled(AppCardImage)`
  width: 25%;
  min-width: 6em;
  background: url(${props => props.src}) center center;
  background-size: cover;

  ${media.mdScreen`
    min-width: 25%;
  `}
`;

const MarginAfterP = AppText.withComponent("p").extend`
  margin-bottom: 1em;
`;

const AppButtonAnchor = AppButton.withComponent("a").extend`
  text-decoration: none;
`;

class EventCard extends Component {
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
      <EventCardBase className={this.props.className}>
        <EventCardImage
          src={this.props.event.poster_url}
          alt={this.props.event.name}
        />
        <AppCardTextBox>
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
        </AppCardTextBox>
      </EventCardBase>
    );
  }
}

export default EventCard;
