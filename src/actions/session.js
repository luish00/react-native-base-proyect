import { createActions } from 'redux-actions';

const actions = createActions({
  DO_LOGIN: (data) => data,
  DO_LOGOUT: () => { },
  LOG_IN: (data) => data,
  LOG_IN_FAIL: (data) => data,
  LOG_OUT: () => { },
  STARTUP: () => { },
  TOKEN_LOADED: (data) => data,
});

export const {
  doLogin,
  startup,
  doLogout,
  logIn,
  logInFail,
  logOut,
  tokenLoaded,
} = actions;
