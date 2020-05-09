import { handleActions } from 'redux-actions';

const INITIAL_STATE = {
  email: '',
  errorLogin: '',
  loading: false,
  name: '',
  startup: false,
  token: null,
  userId: null,
};

export default handleActions({
  DO_LOGIN: (state, { payload }) => ({
    ...state,
    errorLogin: payload.message,
    loading: true,
  }),
  LOG_IN_FAIL: (state, { payload }) => ({
    ...state,
    errorLogin: payload.message,
    loading: false,
  }),
  LOG_OUT: () => ({ ...INITIAL_STATE, startup: true }),
  TOKEN_LOADED: (state, { payload }) => ({
    ...state,
    email: payload.email,
    name: payload.name,
    startup: true,
    token: payload.token,
    userId: payload.userId,
  }),
}, INITIAL_STATE);
