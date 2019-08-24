import { combineReducers } from "redux";

import clusters from "reducers/domainData/clusters";
import eventsBrowse from "reducers/domainData/eventsBrowse";
import eventsCreateEdit from "reducers/domainData/eventsCreateEdit";
import eventsFeatured from "reducers/domainData/eventsFeatured";
import eventsUpcoming from "reducers/domainData/eventsUpcoming";
import eventsSingle from "reducers/domainData/eventsSingle";
import eventsApproved from "reducers/domainData/eventsApproved";
import eventsPending from "reducers/domainData/eventsPending";
import hosts from "reducers/domainData/hosts";
import offices from "reducers/domainData/offices";
import orgTypes from "reducers/domainData/orgTypes";
import tags from "reducers/domainData/tags";
import venues from "reducers/domainData/venues";

const domainData = combineReducers({
  clusters,
  eventsBrowse,
  eventsCreateEdit,
  eventsFeatured,
  eventsUpcoming,
  eventsSingle,
  eventsApproved,
  eventsPending,
  hosts,
  offices,
  orgTypes,
  tags,
  venues
});

export default domainData;
