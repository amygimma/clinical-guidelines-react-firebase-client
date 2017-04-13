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
  apiKey: "AIzaSyBMF4gucpppk97a8pv9PrEkzIpx6w74Q2Q",
  authDomain: "clinical-guidelines-alpha.firebaseapp.com",
  databaseURL: "https://clinical-guidelines-alpha.firebaseio.com",
  projectId: "clinical-guidelines-alpha",
  storageBucket: "clinical-guidelines-alpha.appspot.com",
  messagingSenderId: "772771058260"
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
