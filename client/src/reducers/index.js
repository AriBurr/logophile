import { combineReducers } from 'redux';
import activeBook from './activeBook';
import books from './books';
import flash from './flash';
import user from './user';
import persist from './persist';
import bookshelves from './bookshelves';

const rootReducer = combineReducers({
  activeBook,
  books,
  flash,
  user,
  persist,
  bookshelves,
});

export default rootReducer;
