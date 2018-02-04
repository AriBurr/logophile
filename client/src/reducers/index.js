import { combineReducers } from 'redux';
import activeBook from './activeBook';
import books from './books';
import flash from './flash';
import user from './user';
import bookshelves from './bookshelves';

const rootReducer = combineReducers({
  activeBook,
  books,
  flash,
  user,
  bookshelves,
});

export default rootReducer;
