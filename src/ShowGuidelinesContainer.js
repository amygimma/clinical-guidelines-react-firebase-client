import React from 'react';
import { connect } from 'react-redux';
import { pathToJS } from 'react-redux-firebase';

import ShowGuidelinesComponent from './ShowGuidelinesComponent';

const ShowGuidelinesContainer = ({profile}) => (
  <ShowGuidelinesComponent profile={profile}/>
);


const mapStateToProps = ({firebase}) => {
  return {
    profile: pathToJS(firebase, 'profile') || {}
  }
};

export default connect(mapStateToProps, null)(ShowGuidelinesContainer);
