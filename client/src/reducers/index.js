import { combineReducers } from 'redux';
import books from './books';
import flash from './flash';

const rootReducer = combineReducers({
  books,
  flash,
});

export default rootReducer;
