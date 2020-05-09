import { handleActions } from 'redux-actions';

const INITIAL_STATE = {
  checkEmailError: '',
  checkingEmailUser: false,
  errorMessage: '',
  isError: false,
  savingProfile: false,
  validEmail: false,
};

export default handleActions({
  CLEAN_SIGNUP: () => ({
    ...INITIAL_STATE,
  }),
  DO_CHECK_EMAIL: (state) => ({
    ...state,
    checkingEmailUser: true,
    validEmail: true,
  }),
  DO_SIGNUP: (state) => ({
    ...state,
    errorMessage: '',
    isError: false,
    savingProfile: true,
  }),
  EMAIL_CHECK_FAILED: (state, { payload }) => ({
    ...state,
    checkEmailError: payload,
    checkingEmailUser: false,
    isError: true,
  }),
  LOAD_SIGNUP: (state) => ({
    ...state,
    checkingEmailUser: false,
    errorMessage: '',
    isError: false,
  }),
  SIGNUP_FAIL: (state, { payload }) => ({
    ...state,
    errorMessage: payload,
    isError: true,
    savingProfile: false,
  }),
}, INITIAL_STATE);
