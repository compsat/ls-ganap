import { combineReducers } from "redux";

import clusters from "reducers/domainData/clusters";
import eventsBrowse from "reducers/domainData/eventsBrowse";
import eventsFeatured from "reducers/domainData/eventsFeatured";
import eventsUpcoming from "reducers/domainData/eventsUpcoming";
import hosts from "reducers/domainData/hosts";
import offices from "reducers/domainData/offices";
import orgTypes from "reducers/domainData/orgTypes";
import tags from "reducers/domainData/tags";
import venues from "reducers/domainData/venues";

const domainData = combineReducers({
  clusters,
  eventsBrowse,
  eventsFeatured,
  eventsUpcoming,
  hosts,
  offices,
  orgTypes,
  tags,
  venues
});

export default domainData;
