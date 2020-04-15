import { call, put } from 'redux-saga/effects';

import { post } from '../utils/api';
import {
  getStorageData,
  generateUUID,
  removeData,
  storeData,
  doNothing,
} from '../utils';
import { tokenLoaded } from '../actions';

export function* loadToken() {
  const token = yield getStorageData('token');

  yield put(tokenLoaded({ token }));
}

export function* logOut() {
  yield call(removeData, 'token');
}

function* fakeLogin() {
  const TOKEN = generateUUID();
  yield call(storeData, { data: TOKEN, key: 'token' });
  yield put(tokenLoaded({ token: TOKEN }));
}

export function* doLogin({ payload }) {
  const { email, password } = payload;
  const res = yield call(post, 'login', { email, password });

  if (res.isSuccess) {
    doNothing();
  } else {
    // yield put(loginFail());
    yield call(fakeLogin);
  }
}
