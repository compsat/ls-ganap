import { combineReducers } from "redux";
import orgTypes from "reducers/orgTypes";
import clusters from "reducers/clusters";
import offices from "reducers/offices";
import events from "reducers/events";
import venues from "reducers/venues";
import hosts from "reducers/hosts";
import tags from "reducers/tags";

export default combineReducers({
  orgTypes,
  clusters,
  offices,
  events,
  venues,
  hosts,
  tags
});
