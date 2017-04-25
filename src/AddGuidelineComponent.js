import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {Editor, EditorState, RichUtils, convertFromRaw, convertToRaw} from 'draft-js';
import * as firebase from 'firebase';
import configureStore from './store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions';

import './RichEditor.css';
import './User.css';

// var config = {
//   apiKey: "AIzaSyDZmy5uwUUe2HjwjG8THBUDWmO3dYW3NXE",
//   authDomain: "clinical-guidelines-v01.firebaseapp.com",
//   databaseURL: "https://clinical-guidelines-v01.firebaseio.com",
//   projectId: "clinical-guidelines-v01",
//   storageBucket: "clinical-guidelines-v01.appspot.com",
//   messagingSenderId: "580769026128"
// };
//
// const database = firebase
//   .initializeApp(config)
//   .database()
//   .ref();
//
// const addGuideline = data => database.child('guidelines').push(data, response => response);

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

class AddGuidelineComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => {
      // // console.log(editorState.getBlockMap());
      // console.log(convertToRaw(editorState.getCurrentContent()));
      this.setState({editorState})
    }

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(e) {
    e.preventDefault();
    const store = configureStore();

    // console.log("handleSubmit");
    var st = store.getState()
    var data = {
      name: this.props.formValues.simple.values.name,
      organization: this.props.formValues.simple.values.organization,
      language: this.props.formValues.simple.values.language,
      body: convertToRaw(this.state.editorState.getCurrentContent())
    }
    // addGuideline(data);
    window.location = '/';
    // console.log("end handleSubmit");
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
}

  render() {
    const { pristine, submitting } = this.props;
    const {editorState} = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <form onSubmit={this.handleSubmit}>
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
            <Field name="language" component="select">
              <option value=''>Choose one</option>
              <option value="arabic">Arabic</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
            </Field>
          </div>
        </div>
        <div>
          <div>
            <label>Body</label>
            <div className="RichEditor-root">
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />
              <div className={className} onClick={this.focus}>
                <Editor
                  blockStyleFn={getBlockStyle}
                  customStyleMap={styleMap}
                  editorState={editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  onChange={this.onChange}
                  placeholder="Tell a story..."
                  ref="editor"
                  spellCheck={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({form}) => {
  return {
    formValues: form
  }
}

const mapDispatchToProps = (dispatch) => {
  actions: {
    bindActionCreators({
      addGuideline: Actions.addGuideline
    }, dispatch)
  }
}

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(connect(mapStateToProps, mapDispatchToProps)(AddGuidelineComponent));
