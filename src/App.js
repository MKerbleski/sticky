import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import UsernamePage from './username-page.js'

import {
    AllNotes,
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
    // getLinks,
    getDeletedNotes,
    getUserData,
} from './actions';

class App extends Component {
    constructor(){
        super();
        // this.onDrop = this.onDrop.bind(this);
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
            // let username = localStorage.getItem('username')
            // this.props.history.push(`/${username}`)
        }
    }

    // changeParent = (source_id, target_id) => {
    //     if(source_id !== target_id){
    //         this.editNote({id: source_id, parent_id: target_id})
    //         this.props.getNotes();
    //         // this.props.getLinks();
    //     }
    // }

    disableDelete = () => {
        this.setState({
            deleteEnabled: false,
        })
    }

    //need to unmount when this button is clicked in note detail and vis versa
    toggleNewNote = () => {
        this.setState({
            showNewNote: !this.state.showNewNote
        })
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
                <div className="app-bottom">
                    <Route path="/welcome/" component={Welcome} />
                    <Route 
                        path="/:username" 
                        render={ (a) => {
                            return <UsernamePage
                                redirect={this.redirect}
                                showNewNote={this.state.showNewNote}
                                showDetailMenu={this.showDetailMenu}
                                toggleNewNote={this.toggleNewNote}
                                username={a.match.params.username}
                            />
                        }} 
                    />                           
                </div>
            </AppDiv>
        )
    }
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
        border: 2px solid green;
        display: flex;
        flex-direction: row;
        z-index: 0;
        box-sizing: border-box;
        height: 95vh;
        
    }
`;