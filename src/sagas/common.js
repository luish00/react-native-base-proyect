import { call, put } from 'redux-saga/effects';

import { hideSnackBar } from '../actions';
import { sleep } from '../utils';

export function* showNackBar() {
  yield call(sleep, 2000);
  yield put(hideSnackBar());
}
