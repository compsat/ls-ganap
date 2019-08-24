import React from "react";
import { connect } from "react-redux";
import { format } from "date-fns";

import { makeDenormalizeEvent } from "selectors/eventsSelectors";
import { postTag } from "actions/tags";
import { putEvent } from "actions/eventsCreateEdit";

const mapStateToProps = (state, ownProps) => {
  const denormalizeEvent = makeDenormalizeEvent(ownProps.id);
  const event = denormalizeEvent(state, ownProps);

  const logistic = event.event_logistics[0];

  return {
    eventId: ownProps.id,
    name: event.name,
    hosts: formatHosts([
      ...event.office_hosts,
      ...event.org_hosts,
      ...event.sanggu_hosts
    ]),
    date: format(new Date(logistic.date), "YYYY-MM-DD"),
    start_time: formatTime(logistic.start_time),
    end_time: formatTime(logistic.end_time),
    venue: formatVenue(logistic),
    poster_url: event.poster_url,
    audience: formatAudience(ownProps.audiences, event),
    description: event.description,
    tags: formatTags(event.tags),
    history: ownProps.history,
    all_hosts: ownProps.hosts,
    venues: ownProps.venues,
    all_tags: ownProps.tags
  };
};

const mapDispatchToProps = dispatch => ({
  postTag: tag => dispatch(postTag(tag)),
  putEvent: (
    eventId,
    name,
    audience,
    description,
    tags,
    poster_url,
    hosts,
    event_logistics,
    history
  ) =>
    dispatch(
      putEvent(
        eventId,
        name,
        audience,
        description,
        tags,
        poster_url,
        hosts,
        event_logistics,
        history
      )
    )
});

export default props => {
  return React.createElement(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(props.component),
    props
  );
};

const formatAudience = (audiences, event) => {
  if (audiences) {
    const eventAudience = audiences.find(
      audience => audience.value == event.audience
    );
    return {
      value: eventAudience.value,
      label: eventAudience.label
    };
  }
};

const formatTags = tags => {
  return tags.map(tag =>
    typeof tag !== "undefined"
      ? {
          value: tag.id,
          label: tag.name
        }
      : null
  );
};

const formatVenue = logistic => {
  return logistic.venue
    ? {
        label: logistic.venue.name,
        value: logistic.venue.id
      }
    : {
        label: logistic.outside_venue_name,
        value: logistic.outside_venue_name
      };
};

const formatHosts = hosts => {
  return hosts.map(host => ({
    value: host.id,
    label: host.abbreviation
  }));
};

const formatTime = time => {
  const [hours, mins] = time.split(":");
  const timeStringOptions = {
    hour12: false,
    hour: "numeric",
    minute: "2-digit"
  };
  const timeContainer = new Date();

  timeContainer.setHours(hours, mins);

  return timeContainer.toLocaleTimeString("en-US", timeStringOptions);
};
