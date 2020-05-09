import { handleActions } from 'redux-actions';

const INITIAL_STATE = {
  brand: '',
  cardNumber: '',
  cvv: '',
  expirationDate: '',
  id: null,
  loadingPaymentMethod: false,
  loadingSave: false,
  message: '',
  messageError: false,
  paymentMethodLoaded: false,
  paymentType: 0,
};

export default handleActions({
  CARD_NUMBER_CHANGED: (state, { payload }) => ({
    ...state,
    brand: '',
    cardNumber: payload || '',
    message: '',
    messageError: false,
  }),
  CVV_CHANGED: (state, { payload }) => ({
    ...state,
    cvv: payload,
  }),
  DO_LOAD_PAYMENT_METHOD: (state) => ({
    ...state,
    loadingPaymentMethod: true,
  }),
  DO_SAVE_PAYMENT_METHOD: (state) => ({
    ...state,
    loadingSave: true,
    message: '',
    messageError: false,
  }),
  EXPIRATION_DATE_CHANGED: (state, { payload }) => ({
    ...state,
    expirationDate: payload || '',
  }),
  PAYMENT_METHOD_FAILED: (state) => ({
    ...state,
    loadingPaymentMethod: false,
    message: '',
    messageError: false,
    paymentMethodLoaded: true,
  }),
  PAYMENT_METHOD_LOADED: (state, { payload }) => ({
    ...state,
    brand: payload.brand,
    cardNumber: payload.cardNumber || '',
    cvv: '',
    expirationDate: payload.expirationDate || '',
    id: payload.id,
    loadingPaymentMethod: false,
    message: '',
    messageError: false,
    paymentMethodLoaded: true,
    paymentType: payload.paymentType,
  }),
  SAVE_PAYMENT_METHOD_FAILED: (state, { payload }) => ({
    ...state,
    loadingSave: false,
    message: payload,
    messageError: true,
  }),
  SAVE_PAYMENT_METHOD_SUCCESS: (state, { payload }) => ({
    ...state,
    id: 1,
    loadingSave: false,
    message: payload,
    messageError: false,
  }),
}, INITIAL_STATE);
