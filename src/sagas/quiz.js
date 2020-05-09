import { put, call } from 'redux-saga/effects';
import { t } from 'i18n-js';
import { get, post } from '../utils/api';

import {
  quizSaveFailed,
  quizSaveSuccessful,
  loadQuizSuccesful,
  loadQuizFailed,
} from '../actions';
import { sleep } from '../utils';

export function* saveQuiz({ payload }) {
  try {
    const { data, userId } = payload;

    const response = yield call(post, `api/users/${userId}/quizes`, data);

    if (response.type === 200) {
      const message =
        response.hasMessages ? response.message : t('quizScreen.saveSuccesful');

      yield put(quizSaveSuccessful(message));
      yield call(sleep, 2000);
      yield put(quizSaveSuccessful(''));
    } else {
      const message =
        response.hasMessages ? response.message : t('quizScreen.saveFailed');

      yield put(quizSaveFailed(message));
    }
  } catch (error) {
    yield put(quizSaveFailed(t('genericError')));
  }
}

export function* loadQuiz({ payload }) {
  try {
    const response = yield call(get, `api/users/${payload.userId}/quizes`);

    if (response.type === 200) {
      const {
        id,
        firstPerDate,
        lastPerDate,
        mensesFrecuency,
        periodTime,
      } = response.data[0];

      yield put(loadQuizSuccesful({
        firstPeriod: new Date(firstPerDate),
        id,
        lastPeriod: new Date(lastPerDate),
        periodFrequency: String(mensesFrecuency),
        periodLenght: String(periodTime),
      }));
    } else {
      yield put(loadQuizFailed());
    }
  } catch (error) {
    yield put(loadQuizFailed());
  }
}
