import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {Editor, EditorState} from 'draft-js';

import './User.css';

class AddGuidelineComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <div>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder="Guideline Name"
            />
          </div>
        </div>
        <div>
          <label>Organization</label>
          <div>
            <Field name="organization" component="select">
              <option value=''>Choose one</option>
              <option value="MSF Paris">MSF Paris</option>
              <option value="Red Cross Panama">Red Cross Panama</option>
              <option value="Other">Other</option>
            </Field>
          </div>
        </div>
        <div>
          <label>Language</label>
          <div>
            <Field name="organization" component="select">
              <option value=''>Choose one</option>
              <option value="arabic">Arabic</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
            </Field>
          </div>
        </div>
        <div>
          <Editor editorState={this.state.editorState} onChange={this.onChange} />
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(AddGuidelineComponent);
