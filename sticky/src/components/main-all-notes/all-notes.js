import React, { Component } from 'react';
import styled from 'styled-components';
import { AllNotesBin } from '../index';
import { 
  getLinks,
  getNotes,
 } from '../../actions'
import { connect } from 'react-redux';

class AllNotes extends Component {
  constructor(props){
    super(props);
    this.state = {
      stateNotes: false,
      notes: [],
    }
  }

  componentDidMount(){
    console.log(this.props)
    if(localStorage.getItem('JWT')){
      this.props.getLinks();
      this.props.getNotes();
    } else {
      this.props.history.push('/welcome/login')
    }
  }

  render(props) {    
    return (
      <AllNotesDiv>
        {this.props.notes.length > 0 ? 
            <AllNotesBin 
                type="top" 
                onDrop={this.props.onDrop} 
                allNotes={this.props.notes} 
                allLinks={this.props.links} 
                newNote={this.props.newNote}
                showNewNote={this.props.showNewNote}
                redirect={this.props.redirect}
             /> : 
                <h1>loading notes</h1>}
            </AllNotesDiv>
    );
  }
}

const mapStateToProps = store => {
  return {state: store};
}

const mapDispatchToProps = {
  getLinks,
  getNotes,
}

export default connect(mapStateToProps, mapDispatchToProps)(AllNotes)

const AllNotesDiv = styled.div`
${'' /* border: 1px solid green; */}
  display: flex;
  flex-direction: column;
  padding: 15px;
  ${'' /* background-color: #2a465c; */}
  color: black;
  overflow: auto;
  .all-notes {
    ${'' /* border: 1px solid blue; */}
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    padding: 20px;
    ${'' /* height: 100%; */}
    .note-link{
      text-decoration: none;
    }
  }
`;