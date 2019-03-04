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
    getDeletedNotes,
    getUserData,
} from './actions';

class App extends Component {
    constructor(){
        super();
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
                    <Route 
                        path="/welcome/" 
                        component={Welcome} />
                    <Route 
                        path="/:username" 
                        render={ (a) => {
                            return <UsernamePage
                                redirect={this.redirect}
                                showNewNote={this.state.showNewNote}
                                showDetailMenu={this.showDetailMenu}
                                toggleNewNote={this.toggleNewNote}
                                username={a.match.params.username}
                                match={a.match}
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
box-sizing: border-box;
border: 1px solid red;
margin: 2px;
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 99vh;
    max-height: 100vh;
    max-width: 100vw;
    .app-top {
        border: 1px solid purple;
        margin: 2px;
        box-sizing: border-box;
        max-height: 5vh;
    }
    .app-bottom {
        border: 2px solid green;
        box-sizing: border-box;
        margin: 2px;
        padding: 2px;
        display: flex;
        flex-direction: row;
        z-index: 0;
        max-height: 95vh;
        height: 99%;
    }
`;