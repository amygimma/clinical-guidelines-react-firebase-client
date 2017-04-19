import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase'
import { reducer as formReducer } from 'redux-form'
import guidelinesReducer from './guidelinesReducer';

export default combineReducers({
  firebase: firebaseStateReducer,
  form: formReducer,
  guidelines: guidelinesReducer
});
