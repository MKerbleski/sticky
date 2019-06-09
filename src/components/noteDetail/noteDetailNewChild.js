import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { 
    addNote,
    toggleNewNote
 } from '../../actions'

 import {
    childNoteColor
} from '../../styles/'

class NoteDetailNewChild extends React.Component {
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
                {   text_body: `<p>${this.state.text_body}</p>` },
                //will attach children on backend when new note gets id
                {   id: this.props.parent.id, 
                    children_attached: this.props.parent.children_attached  }
            )
        } else {
            this.props.addNote({text_body: `<p>${this.state.text_body}</p>`})
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
                <NoteDetailNewChildDiv >
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
                </NoteDetailNewChildDiv>        
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

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetailNewChild)

const NoteDetailNewChildDiv = styled.div`
    width: 200px;
    height: 140px;
    display: flex;
    flex-direction: column;  
    margin: 2px;
    input{
        width: 100%;
        height: 140px;
        background-color: ${childNoteColor};
        margin: 0;
        /* min-height: 169px; */
        border: none;
    }
`;
