import { combineReducers } from 'redux';
import activeBook from './activeBook';
import books from './books';
import bookshelf from './bookshelf';
import bookshelves from './bookshelves';
import flash from './flash';
import shelvings from './shelvings';
import topBooks from './topBooks';
import user from './user';

const rootReducer = combineReducers({
  activeBook,
  shelvings,
  books,
  flash,
  user,
  bookshelves,
  bookshelf,
  topBooks,
})

export default rootReducer;
