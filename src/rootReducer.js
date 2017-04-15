import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  firebase: firebaseStateReducer,
  form: formReducer
});
