import { combineReducers } from 'redux';
import events from './events';
import venues from './venues';
import hosts from './hosts';
import tags from './tags';

export default combineReducers({
  events,
  venues,
  hosts,
  tags
});
