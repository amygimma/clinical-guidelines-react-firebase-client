import React from 'react';
import { connect } from 'react-redux';
import { pathToJS, firebaseConnect } from 'react-redux-firebase';

import AddGuidelineComponent from './AddGuidelineComponent';

const AddGuidelineContainer = () => (
  <AddGuidelineComponent />
);


const mapStateToProps = ({firebase}) => {
  return {
    AddGuideline: pathToJS(firebase, 'AddGuideline') || {}
  }
};

export default connect(mapStateToProps, null)(AddGuidelineContainer);
