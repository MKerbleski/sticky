import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import axios from 'axios';

import { start } from './styles/styl-utils.js'

import {
  AllNotes,
  Deleted,
  LeftMenu,
  Welcome, 
  NoteDetailParent,
  RightMenu,
  Settings,
  Header,
} from './components';

import {
  getNotes,
  sortNote,
  logout,
  getLinks,
  getDeletedNotes,
} from './actions';

class App extends Component {
  constructor(){
    super();
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      hideDetails: true,
      main: true, 
      showNewNote: false,
    }
  }

  changeParent = (source_id, target_id) => {
    if(source_id !== target_id){
        this.editNote({id: source_id, parent_id: target_id})
        this.props.getNotes();
        this.props.getLinks();
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem('JWT')){
      this.props.history.push('/all-notes')
    } else {
      this.props.history.push('/welcome/')
    }
  }
  
  deleteNote = (id) => {
    //use this for actualy deleting notes, from trash when set up
    if(localStorage.getItem('JWT')){
      const token = localStorage.getItem('JWT')
      const authHeader = {
        headers: {
          Authorization: token,    
        } 
      }
      console.log(token, id, 'from app')
      axios.delete(`http://localhost:3333/api/notes/${id}`, authHeader)
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
  
  //cannot move because it is used in dragging and dropping
  editNote = (noteEdit) => {
    // console.log('editNote', noteEdit)
    if(localStorage.getItem('JWT')){
      const token = localStorage.getItem('JWT')
      const authHeader = {
        headers: {
          Authorization: token,    
        } 
      }
      axios.put(`http://localhost:3333/api/notes/${noteEdit.id}`, (noteEdit), authHeader)
      .then(res => {
        // console.log("App Edit note respons", res)
        this.props.getNotes();
        //this functino is now only called outside of app so no need ot 'refresh' notes
        // this.props.history.push('/all-notes')
        return res
      }).catch(err => console.log(err.message))
    }else {
      console.log('need to include toekn in request')
  }
  }

  sendToTrash = (noteEdit) => {
    if(localStorage.getItem('JWT')){
      const token = localStorage.getItem('JWT')
      const authHeader = {
        headers: {
          Authorization: token,    
        } 
      }
      axios.put(`http://localhost:3333/api/notes/${noteEdit.id}`, (noteEdit), authHeader)
      .then(res => {
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
  
  getParentId = (id) => {
      let notee =  this.props.state.notes.find(note => {return note.id === +id})
      // console.log(notee)
      if(notee){
        if(notee.parent_id){
          return notee.parent_id
        } else {
          return null
        }
      } else {
        return null
      }
  }

  getParentColor = (id) => {
      let parent_id = this.getParentId(id)
      let parent =  this.props.state.notes.find(note => {return note.id === +parent_id})
      if(parent){
          return parent.note_color
      } else {
        return null
      }
  }

  toggleNewNote = () => {
    this.setState({
      showNewNote: !this.state.showNewNote
    })
  }

  newNote = (newNote) => {
      if(localStorage.getItem('JWT')){
        const token = localStorage.getItem('JWT')
        const authHeader = {
          headers: {
            Authorization: token,    
          } 
        }
      axios.post('http://localhost:3333/api/notes/', (newNote), authHeader)
      .then(res => {
        this.props.getLinks();
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
      // console.log(target)
      if (target.parent_id === +source_id){
        alert('action not allowed')
      }
    } 
    
      // console.log(source_id, type, target_id)
    if(type === "deleteBin"){
      //if has children 
      //ask if want to delete children as well 
      //if yes 
      //if no different route
      const changes = {
        isDeleted: true, 
        id: source_id
      }
      this.sendToTrash(changes)
      //now I don't actually delete the note for reviving. In the trash can there can be an option to permenantly delete.
      // this.deleteNote(source_id)
      //will need to delete any children as well. 
    } else if (type === "note") {
      // console.log(source_id, type, target_id)
      this.changeParent(source_id, target_id)
    } else if (type === "top" || target_id===null){
      // console.log(source_id, type, target_id=null)
      this.editNote({id: source_id, parent_id: target_id})
    } else if (type === "link"){
      let link = source_id
      link.parent_id = target_id
      // console.log(link)
      this.newNote(link)//need to make links into database object with a parent_id of the null or actually the slack folder would work well then either clone or move 
      //the trickier part is that on load the api needs to make sure that it has the current list 
    }    
  }

  redirect = (route) => {
     console.log('redirect to', route)
     this.props.history.push(route)
  }

  render(props) {
    return (
      <AppDiv>
      
        <div className="appTop">
          <Header redirect={this.redirect} />
        </div>
        
        {localStorage.getItem('JWT') ? 

            <div className="app-bottom">
                <LeftMenu 
                    hideDetailMenu={this.hideDetailMenu}
                    toggleNewNote={this.toggleNewNote} />

                <div className="center-display">
                    <React.Fragment>
                        <Route
                            exact
                            path="/all-notes" 
                            render={ () => {
                                return (
                                  <AllNotes
                                    onDrop={this.onDrop} 
                                    changeParent={this.changeParent}
                                    notes={this.props.state.notes}
                                    links={this.props.state.links}
                                    username={this.props.state.username}
                                    getNotes={this.props.getNotes}
                                    getLinks={this.props.getLinks}
                                    showDetailMenu={this.showDetailMenu}
                                    showNewNote={this.state.showNewNote}
                                    newNote={this.newNote}
                                    redirect={this.redirect} />
                                )
                            }}
                          ></Route>

                          <Route
                            exact={!this.state.deleteEnabled}
                            path="/note/:note_id"
                            render={ (note) => {
                              return (
                                <NoteDetailParent
                                  allNotes={this.props.state.notes}
                                  allLinks={this.props.state.links}
                                  note={this.getNoteDetails(note.match.params.note_id)} 
                                  onDrop={this.onDrop} 
                                  changeParent={this.changeParent}
                                  type="note"
                                  parentColor={this.getParentColor(note.match.params.note_id)}
                                  editNote={this.editNote}
                                  targetId={this.getParentId(note.match.params.note_id)}
                                  />
                              )
                            }}></Route>

                          <Route
                            path="/settings"
                            render={() => {
                              return (
                                <Settings />
                              )
                            }}
                          ></Route>
                          
                          <Route
                            path="/deleted"
                            render={() => {
                              return (
                                <Deleted deletedNotes={this.state.deletedNotes} editNote={this.editNote} />
                              )
                            }}
                          ></Route>

                    </React.Fragment> 
                </div> {/*   center-display    */}
                
                {this.state.main ? <RightMenu 
                  slackStars={this.props.state.slackStars}
                  onDrop={this.onDrop} 
                  slack={this.props.state.slackToken} /> : null}
            </div> : 
            <Route path="/welcome/" component={Welcome} />
        }    
      </AppDiv>
    );//return
  }//render
}

const mapStateToProps = store => {
  return {state: store};
}

const mapDispatchToProps = {
  getNotes,
  sortNote,
  logout,
  getLinks,
  getDeletedNotes
}
 export default DragDropContext(HTML5Backend)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));

 const AppDiv = styled.div`
     ${start('red')}
      flex-direction: column;
      background-color: white;
      height: 100vh;
      width: 98vw;
      box-sizing: border-box;
      .all-notes {
        box-sizing: border-box;
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
     .app-bottom {
        ${'' /* border: 1px solid blue; */}
        ${'' /* background: black; */}
        display: flex;
        flex-direction: row;
        z-index: 0;
        box-sizing: border-box;
        height: 95vh;
        .center-display{
          ${'' /* border: 1px solid blue; */}
          ${'' /* background-color: black; */}
          width: 100%;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          ${'' /* height: 94vh; */}
          overflow: auto;
        }
        .delete {
          ${'' /* border: 1px solid red; */}
          display: flex;
          width: 100vw;
          ${'' /* height: 100vh; */}
          background-color:rgba(215,215,215,0.5);
          position: fixed;
          z-index: 10;
          justify-content: center;
          align-items: center;
        }
     }
     
 `;
