import { createActions } from 'redux-actions';

const actions = createActions({
  HIDE_SNACK_BAR: (data) => data,
  SHOW_SNACK_BAR: (data) => data,
});

export const { hideSnackBar, showSnackBar } = actions;
