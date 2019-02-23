import { combineReducers } from 'redux';
import entities from 'reducers/entities';
import filters from 'reducers/filters';

export default combineReducers({
  entities,
  filters
});
