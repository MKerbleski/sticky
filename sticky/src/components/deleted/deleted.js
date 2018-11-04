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

    restoreNote = (e) => {
        // e.preventDefault();
        let edit = {
            id: e.target.id, 
            isDeleted: false,
        }
        this.props.editNote(edit);
    }

    render(){
        return (
            <DeletedDiv> 
                {this.props.state.deletedNotes ?
                    <React.Fragment>
                        <h1>this is the deleted div</h1>
                        {this.props.state.deletedNotes.map(note => {
                            return (
                                <div key={note.id} className="deletedNote">
                                    <li><button id={note.id} onClick={this.restoreNote}>restore</button>{note.textBody} -- {note.id}</li>
                                </div>
                            )
                        })}
                    </React.Fragment>
                    : 
                    null
                }
            </DeletedDiv> 
        )
    }
}

const mapStateToProps = store => {
    return {state: store};//state is really props & store is store
  }
  
  const mapDispatchToProps = {
    getDeletedNotes
  }

export default connect(mapStateToProps, mapDispatchToProps)(Deleted)

const DeletedDiv = styled.div`
    border: 1px solid red;
`