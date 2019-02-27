import React from "react";
import { connect } from "react-redux";
import { format } from "date-fns";

import { makeDenormalizeEvent } from "selectors/eventsSelectors";

const mapStateToProps = (state, ownProps) => {
  const denormalizeEvent = makeDenormalizeEvent(ownProps.id, [
    "name",
    "hosts",
    "event_logistics",
    "poster_url",
    "description"
  ]);
  const event = denormalizeEvent(state);

  return {
    name: event.name,
    formattedHosts: formatHosts(event.hosts),
    formattedDate: format(
      new Date(event.event_logistics[0].date),
      "MMM D, YYYY"
    ),
    formattedTime: formatTime(event.event_logistics[0].start_time),
    venue: event.event_logistics[0].venue
      ? event.event_logistics[0].venue.name
      : event.event_logistics[0].outside_venue_name,
    poster_url: event.poster_url,
    description: event.description
  };
};

export default props => {
  return React.createElement(connect(mapStateToProps)(props.component), props);
};

const formatHosts = hosts => {
  const hostNames = hosts.map(host => host.abbreviation || host.name);
  let hostsString = `Hosted by ${hostNames[0]}`;

  if (hostNames.length > 1) {
    hostsString += ` and ${hostNames.length - 1} other${
      hostNames.length - 1 > 1 ? "s" : ""
    }`;
  }

  return hostsString;
};

const formatTime = time => {
  const [hours, mins] = time.split(":");
  const timeStringOptions = {
    hour12: true,
    hour: "numeric",
    minute: "2-digit"
  };
  const timeContainer = new Date();

  timeContainer.setHours(hours, mins);

  return timeContainer.toLocaleTimeString("en-US", timeStringOptions);
};
