// import auth from '../auth.js';

// Actions
const CHANGE_FORM = 'CHANGE_FORM';
const SET_AUTH = 'SET_AUTH';
const SENDING_REQUEST = 'SENDING_REQUEST';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const LOGOUT = 'LOGOUT';
const REQUEST_ERROR = 'REQUEST_ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';

// The initial application state
let initialState = {
  formState: {
    username: '',
    password: ''
  },
  error: '',
  currentlySending: false,
  // loggedIn: auth.loggedIn()
};

// Takes care of changing the application state
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return { ...state, formState: action.newFormState };
    case SET_AUTH:
      return { ...state, loggedIn: action.newAuthState };
    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending };
    case REQUEST_ERROR:
      return { ...state, error: action.error };
    case CLEAR_ERROR:
      return { ...state, error: '' };
    default:
      return state;
  }
}

/**
 * Sets the form state
 * @param  {object} newFormState          The new state of the form
 * @param  {string} newFormState.username The new text of the username input field of the form
 * @param  {string} newFormState.password The new text of the password input field of the form
 */
export function changeForm(newFormState) {
  return { type: CHANGE_FORM, newFormState };
}

/**
 * Sets the authentication state of the application
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newAuthState) {
  return { type: SET_AUTH, newAuthState };
}

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 * @param  {boolean} sending True means we're sending a request, false means we're not
 */
export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 */
export function loginRequest(data) {
  return { type: LOGIN_REQUEST, data };
}

/**
 * Tells the app we want to log out a user
 */
export function logout() {
  return { type: LOGOUT };
}

/**
 * Tells the app we want to register a user
 * @param  {object} data          The data we're sending for registration
 * @param  {string} data.username The username of the user to register
 * @param  {string} data.password The password of the user to register
 */
export function registerRequest(data) {
  return { type: REGISTER_REQUEST, data };
}

/**
 * Sets the `error` state to the error received
 * @param  {object} error The error we got when trying to make the request
 */
export function requestError(error) {
  return { type: REQUEST_ERROR, error };
}

/**
 * Sets the `error` state as empty
 */
export function clearError () {
  return { type: CLEAR_ERROR };
}