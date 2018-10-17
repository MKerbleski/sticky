import React, { Component } from 'react';
import styled from 'styled-components';
import AllNotesBin from '../sticky/src/components/allNotesBin.js'

export default class AllNotesNew extends Component {
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
    return (
      <AllNotesDiv>
        <h3>{` Hello ${localStorage.getItem('username')},`}</h3>
        <div className="sort">
          <h4>Sort by :</h4>
            <button onClick={this.props.sortByLetter}>A->Z</button>
            <button onClick={this.props.sortById}>Id</button>
        </div>
        <AllNotesBin 
          type="topBin"
          allNotes={this.props.notes}
          onDrop={this.props.onDrop}
          changeParent={this.changeParent}></AllNotesBin>
        {/* <div className="all-notes">
          {this.props.notes.map( layerOne => {
            if(layerOne.parent_id === null){
              return (
                <NotePreview
                  type="note"
                  onDrop={this.props.onDrop}
                  changeParent={this.changeParent}
                  key={layerOne.id}
                  layerOne={layerOne}
                  allNotes={this.props.notes}
                />)
            } else {
              return null
            }
          })}
        </div> */}
      </AllNotesDiv>
    );
  }
}

const AllNotesDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  ${'' /* background-color: gray; */}
  color: white;
  overflow: hidden;
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
    border: 1px solid red;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    .note-link{
      text-decoration: none;
    }
  }
`;