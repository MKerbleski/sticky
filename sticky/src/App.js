import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import axios from 'axios';

import {
  AllNotes,
  // AllNotesNEW,
  EditNote,
  DeleteNote,
  NewNote,
  NoteDetails,
  LeftMenu,
  Welcome, 
  // TopMenu,
  Header
} from './components';

import {
  // addNote,
  // deleteNote,
  // editNote,
  getNotes,
  sortNote,
  clearNotes,
  } from './actions';

class App extends Component {
  constructor(){
    super();
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      hideDetails: true,
    }
  }

  changeParent = (source_id, target_id) => {
    console.log('change target', 'sourceId: ', source_id, 'targetId: ', target_id)

    if(source_id !== target_id){
        this.editNote({id: source_id, parent_id: target_id})
        this.props.getNotes();
    }
  }

  componentDidMount = () => {
    if(localStorage.getItem('JWT')){
      this.props.history.push('/all-notes')
    } else {
      this.props.history.push('/welcome/')
    }
  
  }
  
  deleteNote = (id) => {
    //use this for actualy deleting notes
    if(localStorage.getItem('JWT')){
      const token = localStorage.getItem('JWT')
      const authHeader = {
        headers: {
          Authorization: token,    
        } 
      }
      console.log(token, id, 'from app')
      axios.delete(`https://lambda-notes-backend-mjk.herokuapp.com/api/notes/${id}`, authHeader)
      .then(res => {
        this.props.history.push('/all-notes')
        this.props.getNotes();
      }).catch(err => console.log(err.message))
    } else {
     console.log('need to include a valid token in request')
    }
  }

  disableDelete = () => {
    this.setState({
      deleteEnabled: false,
    })
  }
  
  editNote = (noteEdit) => {
    if(localStorage.getItem('JWT')){
      const token = localStorage.getItem('JWT')
      const authHeader = {
        headers: {
          Authorization: token,    
        } 
      }
      axios.put(`https://lambda-notes-backend-mjk.herokuapp.com/api/notes/${noteEdit.id}`, (noteEdit), authHeader)
      .then(res => {
        console.log("app111 get notes")
        this.props.getNotes();
        //this functino is now only called outside of app so no need ot 'refresh' notes
        this.props.history.push('/all-notes')
      }).catch(err => console.log(err.message))
    }else {
      console.log('need to include toekn in request')
    }
  }

  enableDelete = () => {
    this.setState({
      deleteEnabled: true,
    })
  }

  fakeDeleteNote = (noteEdit) => {
    if(localStorage.getItem('JWT')){
      const token = localStorage.getItem('JWT')
      const authHeader = {
        headers: {
          Authorization: token,    
        } 
      }
      axios.put(`https://lambda-notes-backend-mjk.herokuapp.com/api/notes/${noteEdit.id}`, (noteEdit), authHeader)
      // axios.put(`https://lambda-notes-backend-mjk.herokuapp.com/api/notes/${noteEdit.id}`, (noteEdit), authHeader)
      .then(res => {
        console.log("app111 get notes")
        this.props.getNotes();
        this.props.history.push('/all-notes')
      }).catch(err => console.log(err.message))
    }else {
      console.log('need to include toekn in request')
    }
  }
  
  getNoteDetails = (id) => {
    return this.props.state.notes.find(note => {return note.id === +id})
  }
  
  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('JWT');
    localStorage.removeItem('username');
    this.props.clearNotes();
    this.props.history.push('/welcome')
  }

  newNote = (newNote) => {
      if(localStorage.getItem('JWT')){
        const token = localStorage.getItem('JWT')
        const authHeader = {
          headers: {
            Authorization: token,    
          } 
        }
      axios.post('https://lambda-notes-backend-mjk.herokuapp.com/api/notes/', (newNote), authHeader)
      .then(res => {
        this.props.history.push('/all-notes')
        // this.props.getNotes();
        //this is not necessary because it is called on a different route than /all notes
      }).catch(err => console.log(err.message))
    } else {
      console.log('need to include toekn in request')
    }
  }

  onDrop(source_id, type, target_id=null){
    // console.log('handleDrop, id: ', id);
    //will delete from actions when uncommented
    // this.props.deleteNote(id)
      
    if(target_id){
      let target = this.getNoteDetails(target_id)
      console.log(target)
      if (target.parent_id === +source_id){
        alert('action not allowed')
      }
    } 
    
      console.log(source_id, type, target_id)
    if(type === "deleteBin"){
      //if has children 
      //ask if want to delete children as well 
      //if yes 
      //if no different route
      const changes = {
        isDeleted: true, 
        id: source_id
      }
      this.fakeDeleteNote(changes)
      //now I don't actually delete the note for reviving. In the trash can there can be an option to permenantly delete.
      // this.deleteNote(source_id)
      //will need to delete any children as well. 
    } else if (type === "note") {
      console.log(source_id, type, target_id)
      this.changeParent(source_id, target_id)
    } else if (type === "top"){
      console.log(source_id, type, target_id=null)
      this.editNote({id: source_id, parent_id: target_id})
    }
    
  }

  sortById = (e) => {
    let newArr = this.props.state.notes.slice()
    function compare(a, b){
      const Aa = a.id;
      const Bb = b.id;
      let comparison = 0;
      if (Aa > Bb) {
        comparison = 1;
      } else if (Aa < Bb) {
        comparison = -1;
      }
      return comparison;
    }
    newArr.sort(compare)
    this.props.sortNote(newArr)
  }
 
  sortByLetter = (e) => {
    let newArr = this.props.state.notes.slice()
    function compare(a, b){
      const titleA = a.title;
      const titleB = b.title;
      let comparison = 0;
      if (titleA > titleB) {
        comparison = 1;
      } else if (titleA < titleB) {
        comparison = -1;
      }
      return comparison;
    }
    newArr.sort(compare)
    this.props.sortNote(newArr)
  }

  render(props) {
    console.log(this.props)
    return (
      <AppDiv>
      
        <div className="appTop">
          <Header logout={this.logout} />
        </div>
        
        <div className="bottom">
            {localStorage.getItem('JWT') ? <LeftMenu /> : null}

            <div className="right-display">
            {localStorage.getItem('JWT') ?
                <React.Fragment>
                    <Route
                        exact
                        path="/all-notes" 
                        render={ () => {
                          return (
                            <AllNotes
                              sortByLetter={this.sortByLetter}
                              sortById={this.sortById}
                              onDrop={this.onDrop} 
                              changeParent={this.changeParent}
                              notes={this.props.state.notes}
                              username={this.props.state.username}
                              getNotes={this.props.getNotes} />
                          )
                        }}
                      ></Route>

                      <Route
                        exact
                        path="/new-note"
                        render={ () => {
                          return (
                            <NewNote
                              count={this.state.count} username={this.props.state.username} newNote={this.newNote} notes={this.state.notes} />
                          )
                        }}
                      ></Route>

                      <Route
                        exact={!this.state.deleteEnabled}
                        path="/all-notes/:noteId"
                        render={ (note) => {
                          return (
                            <NoteDetails
                              enableDelete={this.enableDelete} note={this.getNoteDetails(note.match.params.noteId)} />
                          )
                        }}></Route>

                      <Route
                        exact
                        path="/all-notes/:noteId/edit"
                        render={ (note) => {
                          return (
                            <EditNote
                              count={this.state.count}
                              editNote={this.editNote} note={this.getNoteDetails(note.match.params.noteId)} />
                          )
                        }}
                      ></Route>

                      {(this.state.deleteEnabled) ?
                          (<div className="delete">
                              <Route
                                path="/all-notes/:noteId/delete"
                                render={ (note) => {
                                  return (
                                    <div>
                                      <DeleteNote
                                        deleteNote={this.deleteNote} disableDelete={this.disableDelete} note={this.getNoteDetails(note.match.params.noteId)} />
                                    </div>)}}
                              ></Route>
                          </div>) :
                      null}
                  </React.Fragment> :
              
              <Route path="/welcome/" component={Welcome} />
              }

            </div>
        </div>
        
      </AppDiv>
    );//return
  }//render
}

const mapStateToProps = store => {
  return {state: store};//state is really props & store is store
}

const mapDispatchToProps = {
  getNotes,
  // addNote,
  // deleteNote,
  // editNote,
  sortNote,
  clearNotes,
}
 export default DragDropContext(HTML5Backend)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));

 const AppDiv = styled.div`
     border: 1px solid red;
      display: flex;
      flex-direction: column;
      background-color:white;
      height: 0 auto;
      ${'' /* background-image: url(https://picsum.photos/g/1500/1500?image=${1073}); */}
      ${'' /* background-image: url(http://placeimg.com/1000/1000/arch/grayscale); */}
      .all-notes {
        ${'' /* border: 1px solid red; */}
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: flex-start;
        padding: 20px;
        height: 0 auto;
        .note-link{
          text-decoration: none;
        }
      }
      .top{
        height: 5vh;
      }
     .bottom {
        ${'' /* background: black; */}
        display: flex;
        flex-direction: row;
        z-index: 0;
        ${'' /* height: 93vh; */}
        .right-display{
          ${'' /* border: 1px solid blue; */}
          ${'' /* background-color: black; */}
          width: 100%;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          ${'' /* height: 93vh; */}
          overflow: auto;
        }
        .delete {
          ${'' /* border: 1px solid red; */}
          width: 100vw;
          height: 100vh;
          background-color:rgba(215,215,215,0.5);
          position: fixed;
          z-index: 10;
          display: flex;
          justify-content: center;
          align-items: center;
        }
     }
     
 `;
