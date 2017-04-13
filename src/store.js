import createSagaMiddleware from 'redux-saga';
import { reactReduxFirebase } from 'react-redux-firebase';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

// root reducer
import rootReducer from './rootReducer';

// redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// root saga
import rootSaga from './rootSaga';

// Firebase config
var config = {
  apiKey: "AIzaSyDZmy5uwUUe2HjwjG8THBUDWmO3dYW3NXE",
  authDomain: "clinical-guidelines-v01.firebaseapp.com",
  databaseURL: "https://clinical-guidelines-v01.firebaseio.com",
  projectId: "clinical-guidelines-v01",
  storageBucket: "clinical-guidelines-v01.appspot.com",
  messagingSenderId: "580769026128"
};

// create the store
const sagaMiddleware = createSagaMiddleware();
const configureStore = () => {
  const store = {
    ...createStore(rootReducer, composeEnhancers(
      applyMiddleware(sagaMiddleware), reactReduxFirebase(config, {
        userProfile: 'users', // where profiles are stored in database
        profileFactory: (userData) => { // how profiles are stored in database
          return {
            name: userData.displayName,
            points: 0,
          }
        }
      })))
  };

  sagaMiddleware.run(rootSaga);

  return store;
};


export default configureStore;
