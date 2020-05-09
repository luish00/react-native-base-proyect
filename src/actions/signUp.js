import { createActions } from 'redux-actions';

const actions = createActions({
  CLEAN_SIGNUP: () => { },
  DO_CHECK_EMAIL: (data) => data,
  DO_SIGNUP: (data) => data,
  EMAIL_CHECK_FAILED: (data) => data,
  LOAD_SIGNUP: () => { },
  SIGNUP_FAIL: (data) => data,
});

export const {
  cleanSignup,
  doCheckEmail,
  emailCheckFailed,
  doSignup,
  loadSignup,
  signupFail,
} = actions;
