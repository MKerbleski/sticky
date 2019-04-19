import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {
    Header,
} from './components';

import {
    AboutPage,
    UsernamePage,
    WelcomePage,
    BugsPage
} from './pages'

import {
    getUserData,
} from './actions';

class App extends Component {
    constructor(){
        super();
        this.state = {
            // hideDetails: true,
            // main: true, 
        }
    }

    componentDidMount = () => {
        if(this.props.match.isExact){
            if(localStorage.getItem('username')){
                this.props.history.push(`/${localStorage.getItem('username')}`)
            } else {
                this.props.history.push(`/welcome`)
            }
        } else {
            //do nothing
        }
    }

    //No idea what this is currently
    // disableDelete = () => {
    //     this.setState({
    //         deleteEnabled: false,
    //     })
    // }

    //This is to get around the nested 
    //<a>tag</a> prediciment when selecting a grandchild note
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
                    <Switch>
                        <Route 
                            path="/welcome/" 
                            render={ (a) => {
                                return <WelcomePage
                                    match={a.match}
                                    redirect={this.redirect}
                                />
                            }}  
                        />
                        <Route 
                            path="/about/" 
                            component={AboutPage} />
                        <Route 
                            path="/bugs/"
                            component={BugsPage} />
                        <Route 
                            path="/:username" 
                            render={ (a) => {
                                return (
                                    <UsernamePage
                                        redirect={this.redirect}
                                        username={a.match.params.username}
                                        match={a.match}
                                    />
                                )
                            }} 
                        />                           
                    </Switch>
                </div>
            </AppDiv>
        )
    }
}

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    // getNotes,
    // addNote,
    // sortNote,
    // logout,
    // getLinks,
    // getDeletedNotes,
    getUserData, 
}

export default DragDropContext(HTML5Backend)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));

const AppDiv = styled.div`
    box-sizing: border-box;
    border: 1px solid red;
    /* margin: 2px; */
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 100vh;
    /* max-height: 99vh; */
    max-width: 100vw;
    overflow: hidden;
    .app-top {
        border: 1px solid purple;
        margin: 2px;
        box-sizing: border-box;
        height: 5vh;
        overflow: hidden;
        /* min-height: 100px; */
        min-height: 40px;
    }
    .app-bottom {
        border: 2px solid green;
        box-sizing: border-box;
        margin: 2px;
        padding: 2px;
        display: flex;
        flex-direction: row;
        z-index: 0;
        height: 95vh;
        /* height: 99%; */
    }
`;