import { combineReducers } from 'redux';
import flash from './flash';
import user from './user';

const rootReducer = combineReducers({
  flash,
  user,
});

export default rootReducer;
