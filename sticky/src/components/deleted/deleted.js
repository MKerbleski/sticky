import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios';

export default class Deleted extends Component {
    constructor(props){
        super(props)
        this.state = {
            deleted: [],
        }
    }

    componentDidMount(){
        this.getDeletedNotes();
    }
    restoreNote = (id) => {
        let edit = {
            id: id, 
            isDeleted: false,
        }
        this.props.editNote(edit);
        this.getDeletedNotes()
    }
    getDeletedNotes = () => {
        if(localStorage.getItem('JWT')){
            const token = localStorage.getItem('JWT')
            const authHeader = {
              headers: {
                Authorization: token,    
              } 
            }
            axios.get(`http://localhost:3333/api/notes/del`, authHeader)
            .then(res => {
              console.log("getDeletedNotes", res)
              this.setState({
                  deleted: res.data.allUserDelNotes
              })
            }).catch(err => console.log(err.message))
          }else {
            console.log('need to include toekn in request')
          }
    }

    render(){
        console.log(this.state)
        return (
            <DeletedDiv> 
            {this.state.deleted.length > 0 ?
                <React.Fragment>
                    <h1>this is the deleted div</h1>
                    {this.state.deleted.map(note => {
                        return (
                            <div key={note.id} className="deletedNote">
                                <li>{note.textBody} -- {note.id}</li>
                                <button id={note.id} onClick={this.restoreNote}>restore</button>
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

const DeletedDiv = styled.div`
    border: 1px solid red;
`