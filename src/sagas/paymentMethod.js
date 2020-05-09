import { call, put } from 'redux-saga/effects';

import { post, PUT, get } from '../utils/api';
import I18n from '../i18n';

import {
  paymentMethodFailed,
  paymentMethodLoaded,
  savePaymentMethodFailed,
  savePaymentMethodSuccess,
} from '../actions';

export function* doSavePaymentMethod({ payload }) {
  let res;

  if (payload.id) {
    res = yield call(PUT, `api/paymentMethod/${payload.id}`, payload);
  } else {
    res = yield call(post, 'api/paymentMethod', payload);
  }

  const message = res.message || I18n.t('genericError');

  if (res.isSuccess) {
    yield put(savePaymentMethodSuccess(message));
  } else {
    yield put(savePaymentMethodFailed(message));
  }
}

export function* doLoadPaymentMethod() {
  const res = yield call(get, 'api/paymentMethod');

  if (res.isSuccess) {
    const { data: { data } } = res;
    let paymentMethod = {
      cardNumber: '',
    };

    if (data && data.length) {
      // TODO: n payment method from backend filter
      const { id, card } = data[0];

      const expMonth = String(card.expMonth).length === 1
        ? `0${card.expMonth}` : card.expMonth;
      const expYear = String(card.expYear).substring(2);

      paymentMethod = {
        ...card,
        cardNumber: `**** **** **** ${card.last4}`,
        expirationDate: `${expMonth}/${expYear}`,
        id,
      };
    }

    yield put(paymentMethodLoaded(paymentMethod));
  } else {
    yield put(paymentMethodFailed(I18n.t('genericError')));
  }
}
