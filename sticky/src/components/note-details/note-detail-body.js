import React , { Component } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown';
import { start } from '../../styles/styl-utils.js'
import axios from 'axios'
import {withRouter} from 'react-router'

class NoteDetailBody extends Component {
    constructor(props){
        super(props)
        this.state = {
            edit: false,
            textBody: props.note.textBody
        }
    }

    handleClick = () => {
        console.log('click')
        this.setState({
            edit: true
        })
    }
    
    handleDClick = () => {
        console.log('Dclick')
        this.setState({
            edit: false
        })
    }

    handleEdit = (e) => {
        // e.preventDefault()
        //currently the way that notes are set up the note cannot update unless the page is refreshed. needs to fetched for specific notes when at /note/1 and only get that note or something
        console.log('handleEdit')
        if(localStorage.getItem('JWT')){
            const edit = {
                textBody: this.state.textBody,
                id: this.props.note.id
            }
            const token = localStorage.getItem('JWT')
            const authHeader = {
                headers: {
                Authorization: token,    
                } 
            }
            axios.put(`http://localhost:3333/api/notes/${edit.id}`, (edit), authHeader)
            .then(res => {
                console.log("sent edit note", res)
                // this.props.history.push(`/note/${edit.id}`)
            }).catch(err => console.log(err.message))
        } else {
        console.log('need to include toekn in request')
        }
    }            


    handleInput = (e) => {
        this.setState({
            textBody: e.target.value
        })
    }

    render(props){
        return(
            <NoteDetailBodyDiv  onDoubleClick={this.handleDClick}> 
                {this.state.edit ? 
                    <form className="note-detail-body-edit" onSubmit={this.handleEdit}>
                        <textarea wrap="hard" type='textarea' onChange={this.handleInput} value={this.state.textBody} name='textBody'>{this.value}</textarea>
                        <button>save</button>
                    </form> : 
                    <div className="note-detail-body" onClick={this.handleClick}>
                        {<ReactMarkdown>{this.props.note.textBody}</ReactMarkdown>}
                    </div>
                }
            </NoteDetailBodyDiv>
        )
    }
}

export default withRouter(NoteDetailBody);

const NoteDetailBodyDiv = styled.div`
    border: 1px solid red;
    height: 100%;
    .note-detail-body{
        ${start('blue')}
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
    .note-detail-body-edit{
        background: orange;
        height: 75%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        textarea{
            width: 96%;
            height: 100%;
            margin: 2px;
        }
        button{
            margin: 3px;
        }
    }
`