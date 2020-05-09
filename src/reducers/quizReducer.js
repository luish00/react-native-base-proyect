import { handleActions } from 'redux-actions';

const INITIAL_STATE = {
  answers: {
    firstPeriod: new Date(2000, 0, 1),
    lastPeriod: new Date(Date.now()),
    periodFrequency: '',
    periodLenght: '',
  },
  loadFailed: false,
  loading: true,
  loadSuccesful: false,
  message: '',
  saveFailed: false,
  saveSuccesful: false,
  saving: false,
};

export default handleActions({
  DO_SAVE_QUIZ: (state, { payload }) => ({
    ...state,
    answers: {
      firstPeriod: payload.data.firstPerDate,
      lastPeriod: payload.data.lastPerDate,
      periodFrequency: payload.data.mensesFrecuency,
      periodLenght: payload.data.periodTime,
    },
    message: '',
    saveFailed: false,
    saveSuccesful: false,
    saving: true,
  }),
  LOAD_QUIZ_ANSWERS: () => ({
    ...INITIAL_STATE,
    loadFailed: false,
    loading: true,
    loadSuccesful: false,
  }),
  LOAD_QUIZ_FAILED: (state) => ({
    ...state,
    loadFailed: true,
    loading: false,
    loadSuccesful: false,
  }),
  LOAD_QUIZ_SUCCESFUL: (state, { payload }) => ({
    ...state,
    answers: {
      firstPeriod: payload.firstPeriod,
      lastPeriod: payload.lastPeriod,
      periodFrequency: payload.periodFrequency,
      periodLenght: payload.periodLenght,
    },
    id: payload.id,
    loadFailed: false,
    loading: false,
    loadSuccesful: true,
  }),
  QUIZ_SAVE_FAILED: (state, { payload }) => ({
    ...state,
    message: payload,
    saveFailed: true,
    saveSuccesful: false,
    saving: false,
  }),
  QUIZ_SAVE_SUCCESSFUL: (state, { payload }) => ({
    ...state,
    message: payload,
    saveFailed: false,
    saveSuccesful: true,
    saving: false,
  }),
}, INITIAL_STATE);
