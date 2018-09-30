import styled from 'styled-components';
import React, { Component } from 'react';

import {connect} from 'react-redux';
import {getNotes} from '../../actions';

import SubNote from "../subNote"


class  SingleNote extends Component {
    render(){
        if (this.props.note){
            return (
                <SingleNoteDiv>
                    <h2>{this.props.note.title}</h2>
                    <p>{this.props.note.text}</p>
                    <div className="subNotesContainer">
                        {this.props.state.allNotes.map(subNote => {
                            if (subNote.parent_id == this.props.note.id){
                                return (
                                    <div>
                                        <SubNote key={subNote.id} subNote={subNote} allNotes={this.props.state.allNotes} />
                                    </div>
                                )
                            } else {
                                return null
                            }
                        })}
                    </div>                       
                </SingleNoteDiv>                
            )   
        } else {
            return (
                <p>loading single note div</p>
            )
        }
   }
 }

const mapStateToProps = store => {
    return {state: store};
 }
  
const mapDispatchToProps = {
    getNotes
 }

export default connect(mapStateToProps, mapDispatchToProps)(SingleNote);

const SingleNoteDiv = styled.div`
    border: 1px solid blue;
    margin: 10px;
    max-width: 310px;
    p{
        margin: 5px;
    }
    .subNotesContainer{
        border: 1px solid purple;
        margin: 5px;
        display: flex;
        flex-direction: row;
        
        flex-wrap: wrap;
        max-width: 100%;

    }
    ${'' /* width: 200px;
    height: 50px; */}
`;