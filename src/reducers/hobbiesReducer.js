import { SET_HOBBIES, ADD_HOBBY,REMOVE_HOBBY } from '../actions';

const initialState = { hobbies: [] }
export default function hobbiesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_HOBBIES:
            return action.hobbies;
        case ADD_HOBBY:
            return [action.hobby, ...state];
        case REMOVE_HOBBY:
            return state.filter(hobby => hobby.id !== action._id);            
        default:
            return state;
    }
}