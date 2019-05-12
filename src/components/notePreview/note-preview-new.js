import React from 'react';
import styled from 'styled-components';
import { 
    addNote,
    toggleNewNote
 } from '../../actions'

import { connect } from 'react-redux';

import {
    notePreviewColor
} from '../../styles/'

class NotePreviewNew extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            text_body: ''
        }
    }

    clickHandler = (e) => {
        e.preventDefault()
        this.addNote()
    }

    addNote = (note) => {
        if(this.props.parent){
            this.props.addNote(
                {   text_body: this.state.text_body },
                //will attach children on backend when new note gets id
                {   id: this.props.parent.id, 
                    children_attached: this.props.parent.children_attached  }
            )
        } else {
            this.props.addNote({text_body: this.state.text_body})
        }
        this.setState({
            text_body: ''
        })
    }

    componentWillUnmount(){
        if(this.state.text_body !== ''){
            this.addNote()
        }
    }

    changeHandler = (e) => {
        e.preventDefault();
        this.setState({
            text_body: e.target.value,
        })
    }
    
    render(){
        return (
            <div className="startObject">
                <NotePreviewNewDiv >
                    <form onSubmit={this.clickHandler}>
                        <input 
                            autoFocus 
                            onChange={this.changeHandler} 
                            name="text_body" 
                            value={this.state.text_body}
                            className="note-link" 
                        >
                            {this.value}
                        </input>
                        <button>Save Note</button>
                    </form>
                </NotePreviewNewDiv>        
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    addNote,
    toggleNewNote,
}

export default connect(mapStateToProps, mapDispatchToProps)(NotePreviewNew)

const NotePreviewNewDiv = styled.div`
    ${'' /* border: 1px solid blue; */}
    padding: 10px;
    width: 300px;
    height: auto;
    display: flex;
    flex-direction: column;  
    input{
        width: 100%;
        background-color: ${notePreviewColor};
        margin: 0;
        min-height: 169px;
        border: none;
        ${'' /* border: 1px solid green; */}
    }
`;
