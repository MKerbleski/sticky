import React , { Component } from 'react'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    AllNotesPage,
    NoteDetailPage,
    SettingsPage
} from '../pages'

import {
    LeftMenu,
    RightMenu,
} from '../components';

import {
    getUserData,
} from '../actions';

class UsernamePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            showNewNote: false,
        }
    }

    componentWillMount(){
        if(localStorage.getItem('JWT')){
            this.props.getUserData()
        }
    }

    componentWillUnmount(){
        this.setState({
            showNewNote: false,

        })
    }

    //need to unmount when this button is clicked in note detail and vis versa
    toggleNewNote = () => {
        this.setState({
            showNewNote: !this.state.showNewNote
        })
    }

    render(){
        return(
            <UsernamePageDiv> 
                {localStorage.getItem('JWT') 
                && this.props.store.user.userData
                    ?   <Route
                            path={`${this.props.match.url}/`} 
                            render={ (e) => {
                                // console.log(e)
                                return <LeftMenu
                                    redirect={this.props.redirect}
                                    username={this.props.store.user.userData.username}
                                    toggleRightMenu={this.toggleRightMenu} 
                                    showRightMenu={this.state.showRightMenu}
                                    toggleNewNote={this.toggleNewNote} 
                                    showNewNote={this.state.showNewNote}
                                    location={e.location}
                                    match={e.match}
                                    />
                            }} 
                        />
                    :   null
                }
                <div className="app-center">
                    <Switch>
                        <Route
                            exact
                            path={`${this.props.match.url}/`} 
                            render={ (e) => {
                                return <AllNotesPage
                                    deleteBin={false}
                                    redirect={this.props.redirect}
                                    // showNewNote={this.state.showNewNote}
                                    // showDetailMenu={this.showDetailMenu}
                                    // toggleNewNote={this.toggleNewNote}
                                    author={this.props.username}
                                /> 
                            }} 
                        />
                        <Route
                            // exact={!this.state.deleteEnabled}
                            path={`${this.props.match.url}/note/:note_id`}
                            render={ (note) => {
                                return <NoteDetailPage
                                    note_id={note.match.params.note_id}
                                    author={this.props.match.url}
                                    redirect={this.props.redirect}
                                />
                            }} 
                        />
                        {this.props.username === localStorage.getItem('username') 
                            ?   <React.Fragment>
                                    <Route
                                        path={`${this.props.match.url}/settings`}
                                        component={SettingsPage} 
                                    /> 
                                    <Route
                                        path={`${this.props.match.url}/trash`}
                                        render={() => {
                                            return <AllNotesPage
                                                deleteBin
                                                // onDrop={this.onDrop} 
                                                author={this.props.username}
                                                // showDetailMenu={this.showDetailMenu}
                                                showNewNote={this.state.showNewNote}
                                                toggleNewNote={this.toggleNewNote}
                                                redirect={this.redirect}         
                                            />
                                        }}     
                                    />
                                </React.Fragment>
                            :   <React.Fragment>
                                    <div className="unAuth">
                                        <h1>
                                            <i className="fas fa-ban"></i>
                                        </h1>
                                        Unauthorized
                                    </div> 
                                </React.Fragment>
                            }
                    </Switch>
                </div>
                {this.props.store.user.userData.pocket_initial_sync ||
                this.props.store.user.userData.slack_initial_sync 
                    ?   <RightMenu /> 
                    :   null
                }
            </UsernamePageDiv>
        )
    }
}

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    getUserData, 
}

export default connect(mapStateToProps, mapDispatchToProps)(UsernamePage);

const UsernamePageDiv = styled.div`
    border: 1px solid red;
    margin: 2px;
    padding: 2px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    max-width: 100%;
    width: 100%;
    .app-center {
        border: 2px solid blue;
        box-sizing: border-box;
        margin: 2px;
        max-width: 99%;
        width: 100%;
        display: flex;
        flex-direction: row;
        /* align-items: center; */
        justify-content: center;
        flex-wrap: wrap;
        overflow: auto;
        &::-webkit-scrollbar {
        width: 6px;
            &-thumb{
                background-color: gray;
                border-radius: 25px;
            }
        }
    }
    .unAuth{
        border: 1px solid red;
        margin: 2px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`