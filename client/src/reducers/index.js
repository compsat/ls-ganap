import { combineReducers } from 'redux';
import hosts from './hosts';
import tags from './tags';
import dates from './dates';

export default combineReducers({
  hosts,
  tags,
  dates
});
