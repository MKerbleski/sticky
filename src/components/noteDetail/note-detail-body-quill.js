import React from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components'
import hljs from 'highlight.js'
import {connect} from 'react-redux';

import { 
    editNote 
} from '../../actions'

import {
    scrollBar,
    border
} from '../../styles'

import 'react-quill/dist/quill.snow.css'

hljs.configure({   // optionally configure hljs
    languages: ['javascript', 'ruby', 'python']
});

class NoteQuill extends React.Component {
    constructor (props) {
        super(props)
        this.state = { 
            // text_body: this.props.note.text_body 
        } // You can also pass a Quill Delta here
    }
    
    handleChange = (e) =>  {
        this.setState({ text_body: e })
    }

    componentDidMount(){
        this.setState({
            text_body: this.props.note.text_body.substring(0, this.props.note.text_body.length)
        })
    }

    //This saves when leaving page
    componentWillUnmount(){
        this.saveNote(false)
    }

    //This checks if the note has changed since the component doesn't technically unmount. 
    //Assign state to new props 
    //save previous note 
    //this is jenky but different from attached and children because it needs to be editable so this keeps the edit function contained within this component
    componentDidUpdate(prevProps, prevState){
        if(prevProps.note.id !== this.props.note.id){
            this.setState({
                text_body: this.props.note.text_body
            })
            this.props.editNote({
                text_body: prevState.text_body,
                id: prevProps.note.id
            }, false, false)
        }

    }

    saveNote = (fetchSingle=true) => {
        const edit = {
            text_body: this.state.text_body,
            id: this.props.note.id
        }
        this.props.editNote(edit, false, fetchSingle)
    }

    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            // ['link', 'image'],
            ['clean'], ['code-block']
        ],
        clipboard: {
            matchVisual: false
        }
    }
     
    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'code-block'
    ]    

    render () {
        console.log('Quill', this.props.note)
        console.log('Quill', this.state)
        if(this.state.text_body){
        
            return (
                <NoteQuillDiv>
                    <ReactQuill 
                        className="editor"
                        value={this.state.text_body}
                        onChange={this.handleChange}
                        modules={this.props.preview ? {} : this.modules}
                        formats={this.props.preview ? {} : this.formats}
                    />
                    <div className="buttonRow">
                        <button onClick={this.saveNote}>Save</button>
                    </div>
                    {/* this button is more psychological than necessary, it will save when unmounted, as well */}
                </NoteQuillDiv>
            )
        } else return null
        
    }
}
  
const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    editNote,
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteQuill)

const NoteQuillDiv = styled.div`
    /* min-height: 99%; */
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    box-sizing: border-box;
    /* margin: 9px; */
    border: 1px solid gray;
    height: 98%;
    margin-bottom: 0 !important;
    margin: 2px;
    box-shadow: 0px 0px 5px 1px; 
    background: white;
    /* overflow: hidden; */
    /* .editor IS THE ELEMENT */
    .editor {
        box-sizing: border-box;
        /* ${border('red')} */
        /* margin: 20px; */
        ${scrollBar()}
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        margin: 0 !important;
        padding: 3px;
        background: white;
    }
    /* THE SPACING HERE IS FUCKED CAUSE OF QUILL JUST BE ZEN UNTIL IT IS RELACEABLE */
    .ql-container {
        /* display: none; */
        /* margin-top: 100px; */
        /* ${border('purple')} */
        max-height: 100%;
        /* height: 100%; */
        /* overflow: hidden; */
        /* THERE IS AN IMPORTED CLASS CALLED QL-SNOW THAT WILL APPLY  */
        /* COMES WITH THE LIBRARY */
        /* border-top: 5px solid green !important; */
        padding-bottom: 0 !important;
        background: white;
        overflow: hidden;
        /* THIS IS THE SPACE TO TYPE STUFF */
        .ql-editor {
            /* react 16 opened this bug and this is the inherited class name for the editor container inside ReactQuill */
            /* ${border('green')} */
            border: 1px solid gray;
            max-height: 90%;
            /* height: auto; */
            /* min-height: 100%; */
            background: white;
            /* margin: 0; */
            padding: 5px;
            ${scrollBar()}
        }
    }
    .buttonRow{
        /* ${border()} */
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
        button {
            /* ${border()} */
            box-sizing: border-box;
            /* height: 5%; */
            color: black;
            margin: 5px;
        }
    }
`