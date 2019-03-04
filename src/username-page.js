import React , { Component } from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    AllNotes,
    LeftMenu,
    NoteDetailParent,
    RightMenu,
    Settings,
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

class UsernamePage extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        console.log(this.props)
        return(
            <UsernamePageDiv> 
                {localStorage.getItem('JWT') && this.props.store.user.userData.username
                    ?   <LeftMenu 
                            hideDetailMenu={this.hideDetailMenu}
                            toggleNewNote={this.toggleNewNote} 
                        />
                    :   null}
                    <div className="app-center">
                        <Route
                            exact
                            path="/:author" 
                            render={ (a) => {
                                return <AllNotes
                                    redirect={this.props.redirect}
                                    showNewNote={this.state.showNewNote}
                                    showDetailMenu={this.showDetailMenu}
                                    toggleNewNote={this.toggleNewNote}
                                    author={a.match.params.author}
                                    
                                /> 
                            }} 
                        />
                                
                        <Route
                            // exact={!this.state.deleteEnabled}
                            path="/:author/note/:note_id"
                            render={ (note) => {
                                return <NoteDetailParent
                                    
                                    note_id={note.match.params.note_id}
                                    author={note.match.params.author}
                                    redirect={this.props.redirect}
                                />
                            }} 
                        />

                        <Route
                            path="/:username/settings"
                            component={Settings} 
                        />
                                
                        <Route
                            path="/:username/deleted"
                            render={() => {
                                return <AllNotes 
                                    deleteBin
                                    onDrop={this.onDrop} 
                                    showDetailMenu={this.showDetailMenu}
                                    showNewNote={this.state.showNewNote}
                                    toggleNewNote={this.toggleNewNote}
                                    redirect={this.redirect}         
                                />
                            }}     
                        />
                    </div>
                    {localStorage.getItem('JWT') && this.props.store.user.userData 
                        ?   <RightMenu 
                                onDrop={this.onDrop} 
                            /> 
                        :   null}
            </UsernamePageDiv>
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

export default connect(mapStateToProps, mapDispatchToProps)(UsernamePage);

const UsernamePageDiv = styled.div`
    border: 1px solid red;
    display: flex;
    flex-direction: row;
    .app-center {
            border: 2px solid blue;
            width: 100%;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            overflow: auto;
        }
`