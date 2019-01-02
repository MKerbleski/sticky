import React from 'react';
// import {Editor, EditorState } from 'draft-js'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export class NoteDraft extends React.Component {
    constructor (props) {
      super(props)
      super(props)
      this.state = { text: '' } // You can also pass a Quill Delta here
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ text: value })
      }

    render () {
      return (
        <ReactQuill value={this.state.text}
                  onChange={this.handleChange} />
       )
    }
  }
  
 