import styled from 'styled-components';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';


import { connect } from 'react-redux';
import { addNote, getNotes } from '../actions';


class NewNote extends Component {
    state = {
        "text": ''
    }

    componentDidMount(){
        this.props.getNotes();

    }

    inputHandler= (e) => {
        // console.log(e.target)
        this.setState({
            "text": e.target.value
        })
    }

    dropHandler = (files) => {
        console.log('drophandler', files)
        // this.props.addNote(files)
    }

    newNote = (e) => {
        console.log(this.state)
        e.preventDefault();
        // console.log('new note!')
        this.props.addNote(this.state);
        this.setState({
            "text": '',
        })   
    }

    render(){
            return (
                <NewNoteDiv >
                   <form onSubmit={this.newNote}>   
                        <input 
                            id="newNoteId" 
                            placeholder="start typing for new note. no click necessary"
                            name="body"
                            onChange={this.inputHandler}
                            value={this.state.text}>{this.value}</input>
                   </form>
                   <Dropzone acceptedFiles="URL" onDrop={this.dropHandler}><p>Drag file to add note</p></Dropzone>
                </NewNoteDiv>)
    
    }
}

const mapStateToProps = store => {
    return {state:store};
 }
  
const mapDispatchToProps = {
    addNote, getNotes
 }

export default connect(mapStateToProps, mapDispatchToProps)(NewNote);

const NewNoteDiv = styled.div`
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;

