import { SET_USERS,ADD_USER } from '../actions'; 

const initialState = { users: [] }
export default function usersReducer(state = initialState, action) {  
  switch (action.type) {
    case SET_USERS: 
      return action.users;
    case ADD_USER: 
      return [action.user, ...state];    
    default: 
      return state;
  }
}