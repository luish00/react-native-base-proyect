import { call, put } from 'redux-saga/effects';

import { post, get } from '../utils/api';
import { emailCheckFailed, loadSignup, signupFail } from '../actions';
import { doLogin } from './session';

import I18n from '../i18n';

export function* doCheckEmail({ payload }) {
  const URL = 'api/accountapi/validateuser';

  const response = yield call(get, URL, payload);

  const { isValid, message } = response;

  if (isValid) {
    yield put(loadSignup());
  } else {
    yield put(emailCheckFailed(message));
  }
}

export function* doSignUp({ payload }) {
  const response = yield call(post, 'api/accountapi/register', payload);
  const { isSuccess, message } = response;

  if (isSuccess) {
    yield call(doLogin, { payload });
  } else {
    const errorMessage = message || I18n.t('profileScreen.errorMessage');

    yield put(signupFail(errorMessage));
  }
}
