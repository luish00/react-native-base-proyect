import { all, takeLatest } from 'redux-saga/effects';
import {
  startup as STARTUP,
  doLogin as DO_LOGIN,
  doLoadPaymentMethod as DO_LOAD_PAYMENT_METHOD,
  logOut as LOG_OUT,
  doSaveQuiz as DO_SAVE_QUIZ,
  loadQuizAnswers as LOAD_QUIZ_ANSWERS,
  doCheckEmail as DO_CHECK_EMAIL,
  doSignup as DO_SIGNUP,
  doSavePaymentMethod as DO_SAVE_PAYMENT_METHOD,
  showSnackBar as SHOW_SNACK_BAR,
} from '../actions';
import { loadToken, doLogin, logOut } from './session';
import { saveQuiz, loadQuiz } from './quiz';
import { doSignUp, doCheckEmail } from './signUp';
import { doLoadPaymentMethod, doSavePaymentMethod } from './paymentMethod';
import { showNackBar } from './common';

export default function* sagas() {
  yield all([
    takeLatest(STARTUP, loadToken),
    takeLatest(DO_CHECK_EMAIL, doCheckEmail),
    takeLatest(DO_SIGNUP, doSignUp),
    takeLatest(DO_LOGIN, doLogin),
    takeLatest(LOG_OUT, logOut),
    takeLatest(DO_SAVE_QUIZ, saveQuiz),
    takeLatest(LOAD_QUIZ_ANSWERS, loadQuiz),
    takeLatest(DO_SAVE_PAYMENT_METHOD, doSavePaymentMethod),
    takeLatest(DO_LOAD_PAYMENT_METHOD, doLoadPaymentMethod),
    takeLatest(SHOW_SNACK_BAR, showNackBar),
  ]);
}
