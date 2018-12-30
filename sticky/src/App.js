import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import axios from 'axios';
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
    addNote,
    sortNote,
    logout,
    getLinks,
    getDeletedNotes,
    getUserData,
} from './actions';
import {  } from './styles/styl-utils.js'

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
      this.props.getUserData()
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
      // console.log(token, id, 'from app')
      axios.delete(`http://localhost:3333/api/notes/${id}`, authHeader)
      .then(res => {
        // this.props.history.push('/all-notes')
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
      } else {
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
    } else {
      console.log('need to include token in request')
      alert('Please login and try again.')
    }
  }
  
  getNoteDetails = (id) => {
      return this.props.store.notes.notes.find(note => {return note.id === +id})
  }
  
  getParentId = (id) => {
      let notee =  this.props.store.notes.notes.find(note => {return note.id === +id})
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

  // getParentColor = (id) => {
  //     let parent_id = this.getParentId(id)
  //     let parent =  this.props.store.notes.notes.find(note => {return note.id === +parent_id})
  //     if(parent){
  //         return parent.note_color
  //     } else {
  //       return null
  //     }
  // }

  toggleNewNote = () => {
      this.setState({
        showNewNote: !this.state.showNewNote
      })
  }

  onDrop(source_id, type, target_id=null){
      if(target_id){
          let target = this.getNoteDetails(target_id)
          if (target.parent_id === +source_id){
            alert('action not allowed')
          }
      } 
      if(type === "deleteBin"){
          const changes = {
            is_deleted: true, 
            id: source_id
          }
          this.sendToTrash(changes)
      } else if (type === "note") {
          this.changeParent(source_id, target_id)
      } else if (type === "top" || target_id===null){
          this.editNote({id: source_id, parent_id: target_id})
      } else if (type === "link" && target_id===null){
          //do nothing
      } else if (type === "link"){
          //slack note sends its own type
          let link = source_id
          //source_id for slack notes contains all note properties
          link.parent_id = target_id
          this.props.addNote(link)
      } else if (type === "pocket"){
          console.log("pocket item dropped, and not picked up")
      }
  }

  redirect = (route) => {
     this.props.history.push(route)
  }

  render(props) {
    // console.log(this.props)
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
                                    // changeParent={this.changeParent}
                                    // notes={this.props.state.notes}
                                    links={this.props.store.notes.links}
                                    // username={this.props.state.username}
                                    // getNotes={this.props.getNotes}
                                    // getLinks={this.props.getLinks}
                                    showDetailMenu={this.showDetailMenu}
                                    showNewNote={this.state.showNewNote}
                                    toggleNewNote={this.toggleNewNote}
                                    // newNote={this.newNote}
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
                                  redirect={this.redirect}
                                  allNotes={this.props.store.notes.notes}
                                  // allLinks={this.props.store.notes.links}
                                  note={this.getNoteDetails(note.match.params.note_id)} 
                                  onDrop={this.onDrop} 
                                  changeParent={this.changeParent}
                                  type="note"
                                  // parentColor={this.getParentColor(note.match.params.note_id)}
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
                                <Deleted 
                                 editNote={this.editNote} />
                              )
                            }}
                          ></Route>
                    </React.Fragment> 
                </div> {/*   center-display    */}
                
                {this.props.store.user.userData ? <RightMenu 
                  // slackStars={this.props.state.slackStars}
                  // slack={this.props.state.slackToken}
                  onDrop={this.onDrop} 
                   /> : null}
            </div> : 
            <Route path="/welcome/" component={Welcome} />
        }    
      </AppDiv>
    );//return
  }//render
}

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    getNotes,
    addNote,
    sortNote,
    logout,
    getLinks,
    getDeletedNotes,
    getUserData, 
}
 export default DragDropContext(HTML5Backend)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));

 const AppDiv = styled.div`
      display: flex;
      flex-direction: column;
      background-color: white;
      height: 100vh;
      width: 100vw;
      box-sizing: border-box;
      .top {
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
