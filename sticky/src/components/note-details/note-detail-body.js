import React , { Component } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown';
import { start } from '../../styles/styl-utils.js'
import axios from 'axios'
import {withRouter} from 'react-router'
import NoteDetailBodyEdit from './note-detail-body-edit.js';

class NoteDetailBody extends Component {
    constructor(props){
        super(props)
        this.state = {
            edit: false,
            textBody: this.props.note.textBody,
        }
    }
    componentDidMount(){
        this.setState({
            edit: false,
            textBody: this.props.note.textBody,
        })
    }
    componentWillUnmount(){
        this.setState({
            edit: false,
            textBody: 'test',
        })
    }

    handleClick = () => {
        this.setState({
            edit: true
        })
    }
    
    handleDClick = () => {
        this.setState({
            edit: false
        })
    }

    render(props){
        return(
            <NoteDetailBodyDiv  onDoubleClick={this.handleDClick}> 
                {this.state.edit ? 
                    <NoteDetailBodyEdit editNote={this.props.editNote} note={this.props.note} /> : 
                    <div 
                        className="note-detail-body" 
                        onClick={this.handleClick}>
                          {<ReactMarkdown>{this.props.note.textBody}</ReactMarkdown>}
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