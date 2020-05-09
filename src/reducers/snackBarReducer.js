import { handleActions } from 'redux-actions';

import { COLORS } from '../assets/colors';

const INITIAL_STATE = {
  color: COLORS.secondaryColor,
  message: '',
  show: false,
};

export default handleActions({
  HIDE_SNACK_BAR: (state) => ({ ...INITIAL_STATE, message: state.message }),
  SHOW_SNACK_BAR: (state, { payload }) => ({
    ...state,
    message: payload.message,
    show: true,
  }),
}, INITIAL_STATE);
