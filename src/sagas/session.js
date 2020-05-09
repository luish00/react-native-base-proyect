import { call, put } from 'redux-saga/effects';

import { post } from '../utils/api';
import { getStorageData, removeData, storeData } from '../utils';
import { logInFail, showSnackBar, tokenLoaded } from '../actions';
import I18n from '../i18n';

export function* loadToken() {
  const token = yield getStorageData('token');

  yield put(tokenLoaded({ token }));
}

export function* logOut() {
  yield call(removeData, 'token');
  yield call(removeData, 'userId');
  yield call(removeData, 'name');
  yield call(removeData, 'email');
}

export function* doLogin({ payload }) {
  const { email, password } = payload;
  const res = yield call(post, 'api/authapi/login', { email, password });

  if (res.isSuccess) {
    const { name, token, userId } = res.data;

    yield call(storeData, { data: token, key: 'token' });
    yield call(storeData, { data: userId, key: 'userId' });
    yield call(storeData, { data: name, key: 'name' });
    yield call(storeData, { data: email, key: 'email' });

    yield put(tokenLoaded({ email, name, token, userId }));
  } else {
    const error = res.message || I18n.t('loginScreen.networkError');

    yield put(showSnackBar({ message: error }));
    yield put(logInFail({ message: error }));
  }
}
