import { createActions } from 'redux-actions';

const actions = createActions({
  DO_LOGIN: (data) => data,
  DO_LOGOUT: () => { },
  LOG_FAIL: () => { },
  LOG_IN: (data) => data,
  LOG_OUT: () => { },
  STARTUP: () => { },
  TOKEN_LOADED: (data) => data,
});

export const { doLogin } = actions;
export const { doLogout } = actions;
export const { logIn } = actions;
export const { logFail } = actions;
export const { logOut } = actions;
export const { startup } = actions;
export const { tokenLoaded } = actions;
