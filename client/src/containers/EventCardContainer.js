import React from "react";
import { connect } from "react-redux";
import { format } from "date-fns";

import { makeDenormalizeEvent } from "selectors/eventsSelectors";

const mapStateToProps = (state, ownProps) => {
  const denormalizeEvent = makeDenormalizeEvent(ownProps.id);
  const event = denormalizeEvent(state, ownProps);

  // console.log(ownProps.audiences);

  return {
    eventId: ownProps.id,
    name: event.name,
    formattedHosts: formatHosts([
      ...event.office_hosts,
      ...event.org_hosts,
      ...event.sanggu_hosts
    ]),
    allHosts: formatAllHosts([
      ...event.office_hosts,
      ...event.org_hosts,
      ...event.sanggu_hosts
    ]),
    formattedDate: format(
      new Date(event.event_logistics[0].date),
      "MMM D, YYYY"
    ),
    formattedTime: formatTime(event.event_logistics[0].start_time),
    formattedAllDates: event.event_logistics.map(logistic =>
      format(new Date(logistic.date), "MMM D, YYYY")
    ),
    formattedAllTimes: event.event_logistics.map(
      logistic =>
        formatTime(logistic.start_time) + " - " + formatTime(logistic.end_time)
    ),
    venue: event.event_logistics[0].venue
      ? event.event_logistics[0].venue.name
      : event.event_logistics[0].outside_venue_name,
    allVenues: event.event_logistics.map(logistic =>
      logistic.venue ? logistic.venue.name : logistic.outside_venue_name
    ),
    poster_url: event.poster_url,
    audience: formatAudience(ownProps.audiences, event),
    description: event.description
  };
};

export default props => {
  return React.createElement(connect(mapStateToProps)(props.component), props);
};

const formatAudience = (audiences, event) => {
  if(audiences) {
    const eventAudience = audiences.find(audience => audience.value == event.audience);
    return `${eventAudience.value != "PUB" ? "For " : ""}${eventAudience.label}`;
  }
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

const formatAllHosts = hosts => {
  const hostNames = hosts.map(host => host.name);
  let hostsString = "";

  for (var i = 0; i < hostNames.length; i++) {
    if (i === 0) {
      hostsString += `Hosted by ${hostNames[0]}`;
    } else {
      hostsString += `${i === hostNames.length - 1 ? " and " : ", "} ${
        hostNames[i]
      }`;
    }
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
