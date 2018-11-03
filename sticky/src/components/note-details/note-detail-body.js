import React , { Component } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown';
import { start } from '../../styles/styl-utils.js'
import {withRouter} from 'react-router'
import NoteDetailBodyEdit from './note-detail-body-edit.js';

class NoteDetailBody extends Component {
    constructor(props){
        super(props)
        this.state = {
            edit: false,
            id: this.props.note.id,
            textBody: '',
        }
    }

    componentDidMount(){
        this.setState({
            textBody: this.props.note.textBody,
        })
    }
    handleClick = () => {
        this.setState({
            edit: true
        })
    }

    editFalse = (newText) => {
        this.setState({
            edit: false,
        })
    }
    
    updateState = (textBody) => {
        //I realize this is janky
        this.setState({
            textBody: textBody
        })
    }

    render(props){
        //this is really janky but looks smooth to the user. I am replaceing the props textBody with state textbody so that the user can edit the note without needing to refetch or refresh the page and remain on the same page on save. it does get saved as well
        return(
            <NoteDetailBodyDiv  onDoubleClick={this.editFalse}> 
                {this.state.edit ? 
                    <NoteDetailBodyEdit updateState={this.updateState} editFalse={this.editFalse} editNote={this.props.editNote} textBody={this.state.textBody} id={this.state.id} /> : 
                    <div 
                        className="note-detail-body" 
                        onClick={this.handleClick}>
                          {<ReactMarkdown>{this.state.textBody}</ReactMarkdown>}
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