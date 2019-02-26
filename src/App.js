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
    LeftMenu,
    Welcome, 
    NoteDetailParent,
    RightMenu,
    Settings,
    Header,
    NoteDetailPage
} from './components';
import {
    getNotes,
    addNote,
    sortNote,
    logout,
    // getLinks,
    getDeletedNotes,
    getUserData,
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

    componentDidMount = () => {
        this.props.getUserData()
        if (!localStorage.getItem('JWT')){
            this.props.history.push('/welcome/')
        } else {
            // this.props.history.push('/all-notes')
        }
    }

    changeParent = (source_id, target_id) => {
        if(source_id !== target_id){
            this.editNote({id: source_id, parent_id: target_id})
            this.props.getNotes();
            // this.props.getLinks();
        }
    }

    disableDelete = () => {
        this.setState({
        deleteEnabled: false,
        })
    }
  
    //cannot move because it is used in dragging and dropping
    editNote = (noteEdit) => {
        console.log('editNote in APPPPPPPPP', noteEdit)
        if(localStorage.getItem('JWT')){
            const token = localStorage.getItem('JWT')
            const authHeader = {
                headers: {
                    Authorization: token,    
                } 
            }
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${noteEdit.id}`, (noteEdit), authHeader)
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
            this.editNote(changes)
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

    render() {
        return (
        <AppDiv>
            <div className="app-top">
                <Header redirect={this.redirect} />
            </div>
            {localStorage.getItem('JWT') ? 
                <div className="app-bottom">
                    <LeftMenu 
                        hideDetailMenu={this.hideDetailMenu}
                        toggleNewNote={this.toggleNewNote} />
                    <div className="app-center">
                        <React.Fragment>
                            <Route exact
                                path="/all-notes" 
                                render={ () => {
                                    return <AllNotes
                                            onDrop={this.onDrop} 
                                            // changeParent={this.changeParent}
                                            // notes={this.props.state.notes}
                                            // links={this.props.store.notes.links}
                                            // username={this.props.state.username}
                                            // getNotes={this.props.getNotes}
                                            // getLinks={this.props.getLinks}
                                            showDetailMenu={this.showDetailMenu}
                                            showNewNote={this.state.showNewNote}
                                            toggleNewNote={this.toggleNewNote}
                                            // newNote={this.newNote}
                                            redirect={this.redirect} /> }} />
                            <Route
                                exact={!this.state.deleteEnabled}
                                path="/note/:note_id"
                                render={ (note) => {
                                return <NoteDetailParent
                                    redirect={this.redirect}
                                    allNotes={this.props.store.notes.notes}
                                    // allLinks={this.props.store.notes.links}
                                    note={this.getNoteDetails(note.match.params.note_id)} 
                                    onDrop={this.onDrop} 
                                    changeParent={this.changeParent}
                                    type="note"
                                    editNote={this.editNote}
                                    targetId={this.getParentId(note.match.params.note_id)}
                                    />}} />
                            
                            <Route
                                exact={!this.state.deleteEnabled}
                                path="/:username/note/:note_id"
                                render={ (note) => {
                                    console.log(note)
                                return <NoteDetailPage
                                    // redirect={this.redirect}
                                    // allNotes={this.props.store.notes.notes}
                                    // allLinks={this.props.store.notes.links}
                                    // note={this.getNoteDetails(note.match.params.note_id)} 
                                    noteId={note.match.params.note_id}
                                    username={note.match.params.username}
                                    // onDrop={this.onDrop} 
                                    // changeParent={this.changeParent}
                                    // type="note"
                                    // editNote={this.editNote}
                                    // targetId={this.getParentId(note.match.params.note_id)}
                                    />}} />

                            <Route
                                path="/settings"
                                component={Settings} />
                            
                            <Route
                                path="/deleted"
                                render={() => {
                                return <AllNotes 
                                    deleteBin
                                    onDrop={this.onDrop} 
                                    showDetailMenu={this.showDetailMenu}
                                    showNewNote={this.state.showNewNote}
                                    toggleNewNote={this.toggleNewNote}
                                    redirect={this.redirect} />
                                }} />

                        </React.Fragment> 
                    </div> {/*   app-center    */}
                    
                    {this.props.store.user.userData ? 
                        <RightMenu 
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
    // getLinks,
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
    .app-top {
        height: 5vh;
    }
    .app-bottom {
        display: flex;
        flex-direction: row;
        z-index: 0;
        box-sizing: border-box;
        height: 95vh;
        .app-center {
            width: 100%;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            overflow: auto;
        }
    }
`;