import {
  ADD_ENTITY_CLUSTERS,
  ADD_ENTITY_EVENTS,
  ADD_ENTITY_ORGS,
  ADD_ENTITY_SANGGU,
  ADD_ENTITY_OFFICES,
  ADD_ENTITY_ORG_TYPES,
  ADD_ENTITY_TAGS,
  ADD_ENTITY_VENUES
} from "actions/entities";

const entities = (
  state = {
    clusters: {},
    events: {},
    offices: {},
    orgs: {},
    sanggu: {},
    orgTypes: {},
    tags: {},
    venues: {}
  },
  action
) => {
  switch (action.type) {
    case ADD_ENTITY_CLUSTERS:
      return Object.assign({}, state, {
        clusters: {
          ...state.clusters,
          ...action.clusters
        }
      });
    case ADD_ENTITY_EVENTS:
      return Object.assign({}, state, {
        events: {
          ...state.events,
          ...action.events
        }
      });
    case ADD_ENTITY_OFFICES:
      return Object.assign({}, state, {
        offices: {
          ...state.offices,
          ...action.offices
        }
      });
    case ADD_ENTITY_ORGS:
      return Object.assign({}, state, {
        orgs: {
          ...state.orgs,
          ...action.orgs
        }
      });
    case ADD_ENTITY_SANGGU:
      return Object.assign({}, state, {
        sanggu: {
          ...state.sanggu,
          ...action.sanggu
        }
      });
    case ADD_ENTITY_ORG_TYPES:
      return Object.assign({}, state, {
        orgTypes: {
          ...state.orgTypes,
          ...action.orgTypes
        }
      });
    case ADD_ENTITY_TAGS:
      return Object.assign({}, state, {
        tags: {
          ...state.tags,
          ...action.tags
        }
      });
    case ADD_ENTITY_VENUES:
      return Object.assign({}, state, {
        venues: {
          ...state.venues,
          ...action.venues
        }
      });
    default:
      return state;
  }
};

export default entities;
