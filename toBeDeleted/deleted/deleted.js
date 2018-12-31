import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { connect } from 'react-redux';

import { getDeletedNotes } from '../../actions'

class Deleted extends Component {
    constructor(props){
        super(props)
        this.state = {
            deleted: [],
        }
    }

    componentDidMount(){
        this.props.getDeletedNotes();
    }

    editNote = (noteEdit) => {
        if(localStorage.getItem('JWT')){
            const token = localStorage.getItem('JWT')
            const authHeader = {
                headers: {
                Authorization: token,    
                } 
            }
        axios.put(`http://localhost:3333/api/notes/${noteEdit.id}`, (noteEdit), authHeader)
        .then(res => {
            this.props.getDeletedNotes();
            return res
        }).catch(err => console.log(err.message))
        } else {
            console.log('need to include toekn in request')
        }
    }

    restoreNote = (e) => {
        // e.preventDefault();
        let edit = {
            id: e.target.id, 
            isDeleted: false,
        }
        this.editNote(edit)
        this.props.getDeletedNotes();
    }

    render(){
        return (
            <DeletedDiv> 
                {this.props.state.notes.deletedNotes ?
                    <React.Fragment>
                        <h1>this is the deleted div</h1>
                        {this.props.state.notes.deletedNotes.map(note => {
                            return (
                                <div key={note.id} className="deletedNote">
                                    <li><button id={note.id} onClick={this.restoreNote}>restore</button>{note.text_body} -- {note.id}</li>
                                </div>
                            )
                        })}
                    </React.Fragment> : <p>no deleted notes</p> }
            </DeletedDiv> 
        )
    }
}

const mapStateToProps = store => {
    return {state: store};
}
  
const mapDispatchToProps = {
    getDeletedNotes
}

export default connect(mapStateToProps, mapDispatchToProps)(Deleted)

const DeletedDiv = styled.div`
    border: 1px solid red;
`