import { createActions } from 'redux-actions';

const actions = createActions({
  DO_SAVE_QUIZ: (data) => data,
  LOAD_QUIZ_ANSWERS: (data) => data,
  LOAD_QUIZ_FAILED: () => { },
  LOAD_QUIZ_SUCCESFUL: (data) => data,
  QUIZ_SAVE_FAILED: (data) => data,
  QUIZ_SAVE_SUCCESSFUL: (data) => data,
});

export const {
  loadQuizAnswers,
  loadQuizFailed,
  loadQuizSuccesful,
  quizSaveFailed,
  quizSaveSuccessful,
  doSaveQuiz,
} = actions;
