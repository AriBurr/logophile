import { combineReducers } from 'redux';
import books from './books';
import flash from './flash';
import user from './user';
import persist from './persist';

const rootReducer = combineReducers({
  books,
  flash,
  user,
  persist,
});

export default rootReducer;
