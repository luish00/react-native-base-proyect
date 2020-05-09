import { combineReducers } from 'redux';

import alertConfirm from './alertConfirmReducer';
import session from './sessionReducer';
import quiz from './quizReducer';
import signUp from './SignUpReducer';
import paymentMethod from './paymentMethodReducer';
import snackBar from './snackBarReducer';

export default combineReducers({
  alertConfirm,
  paymentMethod,
  quiz,
  session,
  signUp,
  snackBar,
});
