import React from 'react';
import { firebaseConnect } from 'react-redux-firebase'
import { pathToJS } from 'react-redux-firebase'
import { connect } from 'react-redux';


import AppComponent from './AppComponent';


const App = ({firebase, auth}) => {

  // logs in the user
  const login = () => {
    firebase.login({
      provider: 'google',
      type: 'popup'
    });
  }

  // logs out the user
  const logout = () => {
    firebase.logout();
  }

  // checks if user is logged in
  const authed = auth && auth.uid;

  return <AppComponent
    authed={authed}
    login={login.bind(this)}
    logout={logout.bind(this)}
  />

}

// makes firebase available in the props
const wrappedApp = firebaseConnect()(App);

// grab the auth node from the store
export default connect(({firebase}) => {
  return {
    auth: pathToJS(firebase, 'auth')
  }
}, null)(wrappedApp)
