import { all, takeLatest } from 'redux-saga/effects';
import {
  startup as STARTUP,
  doLogin as DO_LOGIN,
  logOut as LOG_OUT,
} from '../actions';
import { loadToken, doLogin, logOut } from './session';

export default function* sagas() {
  yield all([
    takeLatest(STARTUP, loadToken),
    takeLatest(DO_LOGIN, doLogin),
    takeLatest(LOG_OUT, logOut),
  ]);
}
