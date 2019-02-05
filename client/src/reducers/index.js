import { combineReducers } from 'redux';
import entities from './entities';
import filters from './filters';

export default combineReducers({
  entities,
  filters
});
