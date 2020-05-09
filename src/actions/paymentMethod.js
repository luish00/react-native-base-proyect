import { createActions } from 'redux-actions';

const actions = createActions({
  CARD_NUMBER_CHANGED: (data) => data,
  CVV_CHANGED: (data) => data,
  DO_LOAD_PAYMENT_METHOD: () => { },
  DO_SAVE_PAYMENT_METHOD: (data) => data,
  EXPIRATION_DATE_CHANGED: (data) => data,
  PAYMENT_METHOD_FAILED: (data) => data,
  PAYMENT_METHOD_LOADED: (data) => data,
  SAVE_PAYMENT_METHOD_FAILED: (data) => data,
  SAVE_PAYMENT_METHOD_SUCCESS: (data) => data,
});

export const {
  cardNumberChanged,
  cvvChanged,
  doLoadPaymentMethod,
  doSavePaymentMethod,
  expirationDateChanged,
  paymentMethodLoaded,
  paymentMethodFailed,
  savePaymentMethodFailed,
  savePaymentMethodSuccess,
} = actions;
