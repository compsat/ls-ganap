import { combineReducers } from "redux";

import auth from "reducers/auth";
import entities from "reducers/entities";
import filters from "reducers/filters";

export default combineReducers({
  auth,
  entities,
  filters
});
