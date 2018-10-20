import React, { Component } from 'react';
import styled from 'styled-components';
// import NotePreview from './note-preview.js';
import { AllNotesBin } from '../index';

export default class AllNotes extends Component {
  constructor(props){
    super(props);
    this.state = {
      stateNotes: false,
      notes: [],
    }
  }

  componentDidMount(){
    if(localStorage.getItem('JWT')){
      console.log("getNotes() at allnotes")
      this.props.getNotes();
    } else {
      this.props.history.push('/welcome/login')
    }
  }

  render(props) {    
    console.log(this.props.notes)
    return (
      <AllNotesDiv>
        
        <div className="sort">
          <h4>Sort by :</h4>
            <button onClick={this.props.sortByLetter}>A->Z</button>
            <button onClick={this.props.sortById}>Id</button>
        </div>
        {this.props.notes.length > 0 ? 
        <AllNotesBin type="top" onDrop={this.props.onDrop} allNotes={this.props.notes}/>: <h1>loading notes</h1>}
      </AllNotesDiv>
    );
  }
}

const AllNotesDiv = styled.div`
${'' /* border: 1px solid green; */}
  display: flex;
  flex-direction: column;
  padding: 15px;
  ${'' /* background-color: #2a465c; */}
  color: black;
  ${'' /* height: 100%; */}
  overflow: auto;
  .sort {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 5px 0 0 15px;
    button {
      height: 25px;
      margin: 0 10px;
    }
  }
  .all-notes {
    ${'' /* border: 1px solid blue; */}
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    padding: 20px;
    height: 100%;
    .note-link{
      text-decoration: none;
    }
  }
`;