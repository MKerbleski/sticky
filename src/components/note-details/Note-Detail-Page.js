import React , { Component } from 'react'
import styled from 'styled-components'
import { NoteDetailParent } from './index.js'
import { connect } from 'react-redux'
import {
    getNotes,
} from '../../actions';

//this page is necessary because as it is now there is no way to render a note individually, it is focused on one user with all notes, this component expands the reach so that any user can go to a note specifically and view that note ( if public ).

class NoteDetailPage extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        this.props.getNotes(this.props.noteId)
        console.log(this.props)
    }

    render(){
        const note = this.props.store.notes.note
        console.log(note)
        if(note && note.length > 0){
            return(
                <NoteDetailPageDiv> 
                    <NoteDetailParent note={note[0]} />    
                </NoteDetailPageDiv>
            )
        } else {
            return <p>loading</p>
        }
    }
}

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    getNotes,
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetailPage);

const NoteDetailPageDiv = styled.div`
    border: 1px solid red;
`