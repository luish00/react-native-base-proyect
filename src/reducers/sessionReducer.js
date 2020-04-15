import { handleActions } from 'redux-actions';

const INITIAL_STATE = {
  startup: false,
  token: null,
};

export default handleActions({
  LOG_OUT: () => ({ ...INITIAL_STATE, startup: true }),
  TOKEN_LOADED: (state, { payload }) => ({
    ...state,
    startup: true,
    token: payload.token,
  }),
}, INITIAL_STATE);
