import { combineReducers } from 'redux';
import activeBook from './activeBook';
import books from './books';
import bookshelf from './bookshelf';
import bookshelves from './bookshelves';
import club from './club';
import clubs from './clubs';
import userClubs from './userClubs';
import flash from './flash';
import shelvings from './shelvings';
import topBooks from './topBooks';
import user from './user';

const rootReducer = combineReducers({
  activeBook,
  shelvings,
  books,
  club,
  clubs,
  flash,
  user,
  bookshelves,
  bookshelf,
  topBooks,
  userClubs
});

export default rootReducer;
