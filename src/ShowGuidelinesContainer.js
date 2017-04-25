import React from 'react';
import { connect } from 'react-redux';
import { pathToJS } from 'react-redux-firebase';

import ShowGuidelinesComponent from './ShowGuidelinesComponent';

const ShowGuidelinesContainer = ({profile}, {guidelines}) => (
  <ShowGuidelinesComponent profile={profile} guidelines={guidelines}/>
);


const mapStateToProps = ({firebase}, {guidelines}) => {
  return {
    guidelines,
    profile: pathToJS(firebase, 'profile') || {}
  }
};

export default connect(mapStateToProps, null)(ShowGuidelinesContainer);
