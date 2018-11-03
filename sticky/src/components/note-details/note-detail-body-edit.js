import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

export default class NoteDetailBodyEdit extends Component {
    constructor(props){
        super(props)
        this.state = {
            textBody: this.props.textBody,
        }
    }

    handleInput = (e) => {
        this.setState({
            textBody: e.target.value
        })
    }

    handleEdit = (e) => {
        e.preventDefault()
        //currently the way that notes are set up the note cannot update unless the page is refreshed. needs to fetched for specific notes when at /note/1 and only get that note or something
        //the redirect function at the root app component should solve some of this tempolrarily 
        const edit = {
            textBody: this.state.textBody,
            id: this.props.id
        }
        this.props.editNote(edit, edit.id)
        //I realize this is janky
        this.props.updateState(edit.textBody)
        this.props.editFalse()
        // this.props.editFalse(this.state.textBody);

        // console.log('handleEdit')
        // if(localStorage.getItem('JWT')){
        //     const token = localStorage.getItem('JWT')
        //     const authHeader = {
        //         headers: {
        //         Authorization: token,    
        //         } 
        //     }
        //     axios.put(`http://localhost:3333/api/notes/${edit.id}`, (edit), authHeader)
        //     .then(res => {
        //         console.log("sent edit note", res)
        //         this.props.redirect(edit.id)
        //     }).catch(err => console.log(err.message))
        // } else {
        // console.log('need to include toekn in request')
        // }
    }      

    render(){
        return(
            <NoteDetailBodyEditDiv> 
                <form onSubmit={this.handleEdit}>
                    <input 
                        wrap="hard" 
                        type='textarea' 
                        onChange={this.handleInput} 
                        value={this.state.textBody} name='textBody'>{this.value}</input>
                    <button>save</button>
                </form>
            </NoteDetailBodyEditDiv>
        )
    }
}

const NoteDetailBodyEditDiv = styled.div`
    padding: 0;
    height: 50%;
    form{
        height: 100%;
        input{
        width: 99%;
        height: 87%;
        margin: 0;
        background-color: thistle;
        border: none;
        }
        button{
            height: 12%;
            width: 100%;
            ${'' /* margin: 3px; */}
        }        
`