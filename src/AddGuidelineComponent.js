import React from 'react';
import { Field, reduxForm } from 'redux-form';

import './User.css';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
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
            <button type="submit" disabled={pristine || submitting}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>
        </form>
    );
  }
}

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(MyEditor);
