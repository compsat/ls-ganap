import { combineReducers } from "redux";

import auth from "reducers/authGoogle";
import domainData from "reducers/domainData/domainData";
import entities from "reducers/entities";
import filters from "reducers/filters";

export default combineReducers({
  auth,
  domainData,
  entities,
  filters
});
