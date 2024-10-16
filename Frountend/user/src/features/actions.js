export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const logout = () => ({
  type: LOGOUT
});

export const fetchUserProfile = (user) => ({
  type: FETCH_USER_PROFILE,
  payload: user
});