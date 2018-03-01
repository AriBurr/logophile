import { combineReducers } from 'redux';
import activeBook from './activeBook';
import books from './books';
import bookshelf from './bookshelf';
import bookshelves from './bookshelves';
import currentClub from './currentClub';
import clubs from './clubs';
import userClubs from './userClubs';
import flash from './flash';
import readings from './readings';
import shelvings from './shelvings';
import topBooks from './topBooks';
import user from './user';

const rootReducer = combineReducers({
  activeBook,
  books,
  bookshelves,
  bookshelf,
  clubs,
  currentClub,
  flash,
  readings,
  shelvings,
  topBooks,
  user,
  userClubs
});

export default rootReducer;
