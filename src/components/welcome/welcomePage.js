import React, {Component} from 'react';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';
import bgimg from '../../img/dark-honeycomb.png'
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import { 
    EntryNote,
    Login,
    Register,
    AboutPage,
    TeamPage,
    CareersPage,
    MissionPage,
    AdvertisePage
} from './index.js'

import {
    mainThemePrimary,
    border
} from '../../styles'

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
                <div className="welcomePages">
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
                </div>
                <footer>
                    <div className="footerLinks">
                        <Link to="/welcome/about">About</Link>
                        <Link to="/welcome/team">Team</Link>
                        {/* <Link to="/welcome/careers">Careers</Link> */}
                        <Link to="/welcome/mission">Mission</Link>
                        {/* <Link to="/welcome/advertise">Advertising</Link> */}
                    </div>
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
    /* ${border()} */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-image: url(${bgimg});
    /* background: red; */
    width: 100%;
    /* height: 95vh; */
    box-sizing: border-box;
    .welcomePages{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(255,255,255,0.45);
        height: 100%;
        max-height: 91vh;
        width: 100%;
    }
    footer {
        background: ${mainThemePrimary};
        border-top: 1px solid black;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: center;
        text-align: baseline;
        box-sizing: border-box;
        height: auto;
            /* ${border('red')} */
        .footerLinks{
            /* ${border()} */
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 50%;
            max-width: 650px;
            /* height: 100%; */
            a{
                box-sizing: border-box;
                padding: 7px;
                /* height: 100%; */
                width: 100%;
                text-align: center;
                text-decoration: none;
                color: black;
                :hover{
                    /* background: white; */
                    color: black;
                    text-decoration: underline;
                }
            }
        }
    }
`;