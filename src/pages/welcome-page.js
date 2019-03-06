import React, {Component} from 'react';
import styled from 'styled-components';
// import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

// import { flex } from '../../styles/styl-utils.js'

import { 
    EntryNote,
    Login,
    Register,
} from '../components/welcome'

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
                <footer>
                    <Link to="/about">About</Link>
                    <a href="https://mikerble.ski">Made by Mike</a>
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
    border: 1px solid blue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* background-image: url(https://picsum.photos/1500/1500?image=${Math.floor((Math.random() * 1084) + 1)}); */
    max-width: 99%;
    width: 99%;
    overflow: auto;
    max-height: 100%;
    margin: 2px;
    footer {
        border: 1px solid black;
        max-width: 99%;
        width: 98%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
        text-align: baseline;
        padding: 3px;
        margin: 2px;
    }
`;