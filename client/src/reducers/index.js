import { combineReducers } from 'redux';
import activeBook from './activeBook';
import shelvings from './shelvings';
import books from './books';
import flash from './flash';
import bookshelf from './bookshelf';
import user from './user';
import bookshelves from './bookshelves';

const rootReducer = combineReducers({
  activeBook,
  shelvings,
  books,
  flash,
  user,
  bookshelves,
  bookshelf,
});

export default rootReducer;
