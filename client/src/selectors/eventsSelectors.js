import { createSelector } from "reselect";
import camelCase from "camelcase";

import { makeFlattenHostList } from "selectors/hostsSelectors";

const getEventsItems = state => state.entities.events.items;
const getHostsItems = makeFlattenHostList();
const getVenuesItems = state => state.entities.venues.items;

class DenormalizedEvent {
  constructor(event, hosts, venues) {
    this.event = event;
    this.hosts = hosts;
    this.venues = venues;
  }

  pick(args) {
    return args.reduce((denormalizedEvent, arg) => {
      const argMethodName = `pick${camelCase(arg, { pascalCase: true })}`;

      if (this.__proto__[argMethodName]) {
        denormalizedEvent[arg] = this.__proto__[argMethodName].bind(this)();
      } else {
        denormalizedEvent[arg] = this.event[arg];
      }

      return denormalizedEvent;
    }, {});
  }

  pickHosts() {
    const eventHostsIds = [
      ...this.event.org_hosts,
      ...this.event.sanggu_hosts,
      ...this.event.office_hosts
    ];

    return eventHostsIds.map(id => this.hosts[id]);
  }

  pickEventLogistics() {
    return this.event.event_logistics.map(eventLogistics => ({
      ...eventLogistics,
      venue: this.venues[eventLogistics.venue]
    }));
  }
}

export const makeDenormalizeEvent = (eventId, selectedProps) => {
  return createSelector(
    [getEventsItems, getHostsItems, getVenuesItems],
    (events, hosts, venues) => {
      return new DenormalizedEvent(events[eventId], hosts, venues).pick(
        selectedProps
      );
    }
  );
};

const getEvents = state => state.entities.events;
const getHosts = state => state.entities.hosts;
const getVenues = state => state.entities.venues;

export const makeCanDisplayEvents = () => {
  return createSelector(
    [getEvents, getHosts, getVenues],
    (...args) => {
      return args.every(
        entity =>
          entity.hasInitiatedFetch &&
          !entity.isFetching &&
          !entity.failedToFetch
      );
    }
  );
};
