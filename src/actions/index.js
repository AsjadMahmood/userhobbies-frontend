import { get } from 'axios'; 
export const SET_USERS = 'SET_USERS'; 
export const ADD_USER = 'ADD_USER';
export const SET_HOBBIES = 'SET_HOBBIES'; 
export const ADD_HOBBY = 'ADD_HOBBY';
export const REMOVE_HOBBY = 'REMOVE_HOBBY';

export function setUsers() { 
  return function(dispatch) {
    return get("/api/user") 
      .then(function(response) {
        dispatch({type: SET_USERS, users: response.data}) 
      })
      .catch(function(error) { console.log('error', error); });
  };
};

export function addUser(user) {
  return {
    type: ADD_USER,
    user: user,
  };
};

export function setHobbies() { 
  return function(dispatch) {
    return get("/api/hobbies") 
      .then(function(response) {
        console.log('data',response.data);
        dispatch({type: SET_HOBBIES, hobbies: response.data}) 
      })
      .catch(function(error) { console.log('error', error); });
  };
};

export function addHobby(hobby) {
  return {
    type: ADD_HOBBY,
    hobby: hobby,
  };
};

export function removeHobby(_id) {
  return {
    type: REMOVE_HOBBY,
    _id: _id,
  };
};