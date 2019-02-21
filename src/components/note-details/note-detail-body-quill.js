import React from 'react';
// import {Editor, EditorState } from 'draft-js'
import ReactQuill from 'react-quill';
import styled from 'styled-components'
import hljs from 'highlight.js'
import 'react-quill/dist/quill.snow.css';
import { editNote } from '../../actions'
import { connect } from 'react-redux';

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    editNote,
}

hljs.configure({   // optionally configure hljs
    languages: ['javascript', 'ruby', 'python']
  });

class NoteQuill extends React.Component {
    constructor (props) {
        super(props)
        this.state = { 
            text_body: this.props.note.text_body 
        } // You can also pass a Quill Delta here
        // this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange = (e) =>  {
        this.setState({ text_body: e })
    }

    componentDidMount() {
        // this.setState({
        //     text: this.props.note.text_body,
        // })
    }

    componentWillUnmount(){
        this.saveNote()
    }

    saveNote = () => {
        const edit = {
            text_body: this.state.text_body,
            id: this.props.note.id
        }
        // console.log(e.target)
        this.props.editNote(edit)
    }

    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean'], ['code-block']
        ],
    }
     
    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'code-block'
    ]    

    render () {
      return (
          <NoteQuillDiv>
            <ReactQuill 
                className="editor"
                value={this.state.text_body}
                onChange={this.handleChange}
                modules={this.props.preview ? {} : this.modules}
                formats={this.props.preview ? {} : this.formats}
            />
            <button onClick={this.saveNote}>Save</button>
            {/* this button is more psychological, it will save when unmounted */}
          </NoteQuillDiv>
       )
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NoteQuill)

  const NoteQuillDiv = styled.div`
    height: 100%;
    background: lavender;
    .editor {
        /* max-height: 300px; */
        overflow: hidden;
    }
    button {
        color: black;
    }
    .ql-editor {
        /* react 16 opened this bug and this is the class name for the editor container inside ReactQuill */
        max-height: 400px;
        /* height: 90%; */
        background:white;
        background:#f3f3fd;
        overflow: auto;
        /* background: lavender; */
        &::-webkit-scrollbar {
        width: 6px;
            &-thumb{
                background-color: gray;
                border-radius: 25px;
            }
        }
    }
  `