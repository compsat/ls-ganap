import { combineReducers } from 'redux';
import venues from './venues';
import hosts from './hosts';
import tags from './tags';
import dates from './dates';

export default combineReducers({
  venues,
  hosts,
  tags,
  dates
});
