import React , { Component } from 'react'
import styled from 'styled-components'
import { NoteDetailParent } from './index.js'
import { connect } from 'react-redux'
import {
    getSingleNote,
} from '../../actions';

//this page is necessary because as it is now there is no way to render a note individually, it is focused on one user with all notes, this component expands the reach so that any user can go to a note specifically and view that note ( if public ).

class NoteDetailPage extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        this.props.getSingleNote(this.props.note_id)
    }

    componentWillReceiveProps(nextProps){
        if(this.props.note_id !== nextProps.note_id){
            this.props.getSingleNote(nextProps.note_id)
        }
    }

    render(){
        console.log(this.props)
        const note = this.props.store.notes.notes
        if(note){
            return (
                <NoteDetailPageDiv> 
                    <NoteDetailParent note={note} />    
                </NoteDetailPageDiv>
            )
        } else {
            return <p>loading Note-Detail-Page</p>
        }
    }
}

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    getSingleNote,
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetailPage);

const NoteDetailPageDiv = styled.div`
    border: 1px solid red;
`