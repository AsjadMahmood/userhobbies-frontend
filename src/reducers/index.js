import { combineReducers } from 'redux';
import users from './userReducer';
import hobbies from './hobbiesReducer';

export default combineReducers({
  users: users,
  hobbies: hobbies,
});