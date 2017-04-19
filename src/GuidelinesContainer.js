import React from 'react';
import { connect } from 'react-redux';
import { pathToJS } from 'react-redux-firebase';

import GuidelinesComponent from './GuidelinesComponent';

const GuidelinesContainer = ({profile}) => (
  <GuidelinesComponent profile={profile}/>
);


const mapStateToProps = ({firebase}) => {
  return {
    profile: pathToJS(firebase, 'profile') || {}
  }
};

export default connect(mapStateToProps, null)(GuidelinesContainer);
