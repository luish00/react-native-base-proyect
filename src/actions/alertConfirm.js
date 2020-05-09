import { createActions } from 'redux-actions';

const actions = createActions({
  HIDE_ALERT_CONFIRM: () => { },
  SHOW_ALERT_CONFIRM: (data) => data,
});

export const { hideAlertConfirm, showAlertConfirm } = actions;
