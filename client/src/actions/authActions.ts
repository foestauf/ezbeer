import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
// eslint-disable-next-line import/extensions
import { AuthActionTypes, Decode, GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';
import { UserData } from '../components/auth/types';

// Register User
export const registerUser = (userData: UserData, history: any) => (dispatch: any): void => {
  axios
    .post('/api/users/register', userData, { headers: { 'Content-Type': 'application/json' } })
    .then(() => history.push('/login')) // re-direct to login on successful register
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};
// Login - get user token
export const loginUser = (userData: UserData) => (dispatch: any): void => {
  axios
    .post('/api/users/login', userData, { headers: { 'Content-Type': 'application/json' } })
    .then((res) => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decode: Decode = jwt_decode(token);
      // Set current user
      console.log(decode);
      dispatch(setCurrentUser(decode));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};
// Set logged in user
export function setCurrentUser(newDecode: Decode): AuthActionTypes {
  return {
    type: SET_CURRENT_USER,
    payload: newDecode
  };
}

// User loading
export const setUserLoading = (): AuthActionTypes => {
  return {
    type: USER_LOADING,
  };
};
// Log user out
export const logoutUser = () => (dispatch: any): void => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({
    auth: {},
    errors: {},
    recipe: {}
  }));
}