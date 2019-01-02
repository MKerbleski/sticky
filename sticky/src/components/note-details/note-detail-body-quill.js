import React from 'react';
// import {Editor, EditorState } from 'draft-js'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { editNote } from '../../actions'
import { connect } from 'react-redux';

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    editNote,
}

class NoteQuill extends React.Component {
    constructor (props) {
        super(props)
        this.state = { text_body: this.props.note.text_body } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ text_body: value })
    }

    componentWillUnmount(){
        const edit = {
            text_body: this.state.text_body,
            id: this.props.note.id
        }
        this.props.editNote(edit)
    }

    render () {
      return (
        <ReactQuill 
            onDoubleClick={this.handleEdit}
            value={this.state.text_body}
            onChange={this.handleChange}
             />
       )
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NoteQuill)