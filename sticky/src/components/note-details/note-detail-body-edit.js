import React , { Component } from 'react'
import styled from 'styled-components'

export default class NoteDetailBodyEdit extends Component {
    constructor(props){
        super(props)
        this.state = {
            text_body: this.props.note.text_body,
        }
    }

    handleInput = (e) => {
        this.setState({
            text_body: e.target.value
        })
    }

    handleEdit = (e) => {
        e.preventDefault()
        //currently the way that notes are set up the note cannot update unless the page is refreshed. needs to fetched for specific notes when at /note/1 and only get that note or something
        console.log('handleEdit')
        const edit = {
            text_body: this.state.text_body,
            id: this.props.note.id
        }
        this.props.editNote(edit)
        this.props.changeView();
    }      

    render(){
        return(
            <NoteDetailBodyEditDiv> 
                <form onSubmit={this.handleEdit}>
                    <input 
                        wrap="hard" 
                        type='textarea' 
                        onChange={this.handleInput} 
                        value={this.state.text_body} name='text_body'>{this.value}</input>
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
    }         
`