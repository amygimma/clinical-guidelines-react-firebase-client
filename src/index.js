import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from 'react-router-dom';
import { pathToJS } from 'react-redux-firebase';

import './index.css';
const store = configureStore();

// grab our App and Profile containers
import App from './AppContainer';
import Profile from './ProfileContainer';
import AddGuideline from './AddGuidelineContainer';
import GuidelinesContainer from './GuidelinesContainer';

// restricts access to a route for authenticated users only
function PrivateRoute ({component: Component, ...rest}) {
  const auth = pathToJS(store.getState().firebase, 'auth');
  return (
    <Route
      {...rest}
      render={(props) => auth && auth.uid
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App}></Route>
        <Route path="/guidelines" component={GuidelinesContainer}></Route>
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/add-guideline" component={AddGuideline} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
