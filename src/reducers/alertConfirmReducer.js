import { handleActions } from 'redux-actions';

const INITIAL_STATE = {
  message: '',
  primaryButtonText: '',
  show: false,
  title: '',
};

export default handleActions({
  HIDE_ALERT_CONFIRM: () => ({ ...INITIAL_STATE, show: false }),
  SHOW_ALERT_CONFIRM: (state, { payload }) => ({
    ...state,
    message: payload.message,
    primaryButtonText: payload.primaryButtonText,
    show: true,
    title: payload.title,
  }),
}, INITIAL_STATE);
