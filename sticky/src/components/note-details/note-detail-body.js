import React , { Component } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown';
import { start } from '../../styles/styl-utils.js'
import { withRouter } from 'react-router'
import { default as NoteQuill } from './note-detail-body-quill'
import NoteDetailBodyEdit from './note-detail-body-edit.js';

// {/* <NoteDetailBodyEdit changeView={this.handleDClick} editNote={this.props.editNote} note={this.props.note} /> */}

class NoteDetailBody extends Component {
    constructor(props){
        super(props)
        this.state = {
            edit: false,
            text_body: this.props.note.text_body,
        }
    }
    
    handleDClick = () => {
        this.setState({
            edit: !this.state.edit
        })
    }


    render(){
        return(
            <NoteDetailBodyDiv  onDoubleClick={this.handleDClick}> 
                {this.state.edit ? 
                    <NoteQuill changeView={this.handleDClick} editNote={this.props.editNote} note={this.props.note} /> : 
                    <div 
                        className="note-detail-body" 
                        onDoubleClick={this.handleDClick} >
                          {<ReactMarkdown>{this.props.note.text_body}</ReactMarkdown>}
                    </div>
                }
            </NoteDetailBodyDiv>
        )
    }
}

export default withRouter(NoteDetailBody);

const NoteDetailBodyDiv = styled.div`
    ${'' /* border: 1px solid red; */}
    height: 100%;
    background: lavender;
    .note-detail-body {
        ${start()}
        height: 50%;
        overflow: hidden;
        h4 {
          font-weight: bold;
          margin-bottom: 10px;
          text-decoration: underline;
        }
        p {
          line-height: 30px;
        }
    }
`