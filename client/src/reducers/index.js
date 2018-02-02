import { combineReducers } from 'redux';
import books from './books';
import flash from './flash';
import user from './user';

const rootReducer = combineReducers({
  books,
  flash,
  user,
});

export default rootReducer;
