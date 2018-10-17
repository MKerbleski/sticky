import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Login from './login';
import Register from './register';
import Header from './header';
import { flex } from '../../styles/styl-utils.js'


// import {
//     createUser,
//     loginUser,
//     } from '../../actions';
    
class Welcome extends Component{
    constructor(props){
        super(props);
        this.state = {
            entryNote: '',
        }
    }

    createUser = (newUser) => {
        axios.post('https://lambda-notes-backend-mjk.herokuapp.com/api/welcome/register/', newUser).then(res => {
            localStorage.setItem('JWT', res.data.token)
            localStorage.setItem('username', res.data.username)
            this.props.history.push('/all-notes')
        }).catch(err => {console.log(err.message)})
    }

    loginUser2 = (creds) => {
        axios.post('https://lambda-notes-backend-mjk.herokuapp.com/api/welcome/login', creds).then(res => {
            localStorage.setItem('JWT', res.data.token)
            localStorage.setItem('username', res.data.username)
            this.props.history.push('/all-notes')
        }).catch(err => {console.log(err.message)})
    }

    inputHandler = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })        
        
    }

    render(props){
        // console.log(this.props)
        return(
            <WelcomeDiv>
                <Route path="/welcome" component={Header} />
                <Route path="/welcome/login" render={() => {
                    return <Login failed={(this.props.state.failedLoginAttempt)? true : false} loginUser={this.loginUser2} />}} />
                <Route path="/welcome/register" render={() => {
                    return <Register failed={this.props.state.failedRegistrationAttempt} createUser={this.createUser} />}} />
                <textarea type="text" name="entryNote" placeholder='have an idea? start typing...' onChange={this.inputHandler} value={this.state.entryNote} autofocus>{this.value}</textarea>
            </WelcomeDiv>
        )
    }
}

const mapStateToProps = store => {
    return {state: store};//state is really props & store is store
  }
  
  const mapDispatchToProps = {
    // createUser,
    // loginUser
  }

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)

//379 dope picture

const WelcomeDiv = styled.div`
    ${'' /* border: 1px solid red; */}
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-image: url(https://picsum.photos/1500/1500?image=${Math.floor((Math.random() * 1084) + 1)});
    width: 100%;
    height: 100vh;
    ${'' /* ${flex('column')} */}
    textarea{
        background: rgba(255,255,255,0.15);
        border: none;
        padding: 20px;
        font-size: 20px;
        color: white;
        margin: 100px;
        width: 400px;
        height: 200px;
        ::placeholder{
            color: #F0EFEF;
            color: black;
            font-size: 35px;
        }
    }
    .links{
        width: 75%;
        ${'' /* height: 40px; */}
        ${'' /* border: 1px solid green; */}
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }
    Link{
        padding: 10px;
    }
`;