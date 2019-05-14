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
    BugsPage,
    TeamPage,
    CareersPage,
} from './pages'

import {
    getUserData,
} from './actions';

import {
    border,
} from './styles';

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

    //redirect function is to get around the nested 
    //<a>tag</a> prediciment when selecting a nested link.
    // i.e. clicking on a grandchild note
    redirect = (route) => {
        this.props.history.push(route)
    }

    render() {
        return (
            <AppDiv>
                <Header className="app-top" redirect={this.redirect} />
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
    getUserData, 
}

export default DragDropContext(HTML5Backend)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));

const AppDiv = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 100vh;
    width: 100vw;
    /* overflow: hidden; */
    >*{
        box-sizing: border-box;
    }
    .app-top {
        ${border()}
        /* box-sizing: border-box; */
        /* min-height: 50px; */
        height: 5vh;
        overflow: hidden;
    }
    .app-bottom {
        /* ${border()} */
        /* box-sizing: border-box; */
        display: flex;
        flex-direction: row;
        z-index: 0;
        min-height: 95vh;
        height: 100%;
    }
`;