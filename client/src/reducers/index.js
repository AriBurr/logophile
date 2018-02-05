import { combineReducers } from 'redux';
import activeBook from './activeBook';
import shelvings from './book';
import books from './books';
import flash from './flash';
import user from './user';
import bookshelves from './bookshelves';

const rootReducer = combineReducers({
  activeBook,
  shelvings,
  books,
  flash,
  user,
  bookshelves,
});

export default rootReducer;
