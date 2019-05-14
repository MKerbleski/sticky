import React, {Component} from 'react';
import styled from 'styled-components';
// import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

import { 
    EntryNote,
    Login,
    Register,
} from '../components/welcome'

import {
    AboutPage,
    TeamPage,
    CareersPage,
    MissionPage,
    AdvertisePage
} from '../pages'

export default class WelcomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            entryNote: '',
            sendingData: false,
            noteCount: 0
        }
    }

    componentDidMount(){
        if(localStorage.getItem('username')){
            this.props.redirect(`/${localStorage.getItem('username')}`)
        }
    }

    render(){
        return(
            <WelcomePageDiv>
                <Route 
                    exact 
                    path={`${this.props.match.url}/`} 
                    component={EntryNote}
                />
                <Route 
                    path={`${this.props.match.url}/login`}
                    render={() => {
                        return <Login 
                            redirect={this.props.redirect}
                        />
                    }} 
                />
                <Route 
                    path="/welcome/register" 
                    render={() => {
                        return <Register 
                            redirect={this.props.redirect}
                        />
                    }}
                />
                <Route 
                    path={`${this.props.match.url}/about/`} 
                    component={AboutPage} />
                <Route 
                    path={`${this.props.match.url}/team/`} 
                    component={TeamPage} />
                <Route 
                    path={`${this.props.match.url}/careers/`} 
                    component={CareersPage} />
                <Route 
                    path={`${this.props.match.url}/mission/`} 
                    component={MissionPage} />
                <Route 
                    path={`${this.props.match.url}/advertise/`} 
                    component={AdvertisePage} />
                <footer>
                    <Link to="/welcome/about">About Us</Link>
                    <Link to="/welcome/team">Team</Link>
                    <Link to="/welcome/careers">Careers</Link>
                    <Link to="/welcome/mission">Mission</Link>
                    <Link to="/welcome/advertise">Advertising</Link>
                </footer>
            </WelcomePageDiv>
        )
    }
}

// const mapStateToProps = store => {
//     return {store: store};//state is really props & store is store
// }
  
// const mapDispatchToProps = {
//     // getUserData,
//     // addNote,
// }

// export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)

const WelcomePageDiv = styled.div`
    /* border: 1px solid blue; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* background-image: url(https://picsum.photos/1500/1500?image=${Math.floor((Math.random() * 1084) + 1)}); */
    /* max-width: 99%; */
    width: 100%;
    overflow: auto;
    max-height: 100%;
    /* margin: 2px; */
    footer {
        box-sizing: border-box;
        border-top: 1px solid black;
        /* max-width: 99%; */
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        text-align: baseline;
        padding: 3px;
        /* margin: 2px; */
        a {margin: 7px;}
    }
`;