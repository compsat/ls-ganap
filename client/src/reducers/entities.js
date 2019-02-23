import { combineReducers } from 'redux';
import events from 'reducers/events';
import venues from 'reducers/venues';
import hosts from 'reducers/hosts';
import tags from 'reducers/tags';

export default combineReducers({
  events,
  venues,
  hosts,
  tags
});
