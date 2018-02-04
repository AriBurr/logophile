import { combineReducers } from 'redux';
import books from './books';
import flash from './flash';
import user from './user';
import persist from './persist';
import bookshelves from './bookshelves';

const rootReducer = combineReducers({
  books,
  flash,
  user,
  persist,
  bookshelves,
});

export default rootReducer;
