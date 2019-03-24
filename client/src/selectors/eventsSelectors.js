import { createSelector } from "reselect";
import { denormalize } from "normalizr";

import event from "entities/events";

const getEventEntity = (state, props) => state.entities.events[props.id];
const getOrgs = state => state.entities.orgs;
const getOffices = state => state.entities.offices;
const getSanggu = state => state.entities.sanggu;
const getVenues = state => state.entities.venues;
const getTags = state => state.entities.tags;

export const makeDenormalizeEvent = eventId => {
  return createSelector(
    [getEventEntity, getOrgs, getOffices, getSanggu, getVenues, getTags],
    (eventEntity, orgs, offices, sanggu, venues, tags) => {
      return denormalize(eventId, event, {
        events: { [eventEntity.id]: eventEntity },
        orgs,
        offices,
        sanggu,
        venues,
        tags
      });
    }
  );
};
