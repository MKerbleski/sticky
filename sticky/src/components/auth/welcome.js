import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Login from './login';
import Register from './register';
// import Header from './header';
// import { flex } from '../../styles/styl-utils.js'


// import {
//     createUser,
//     loginUser,
//     } from '../../actions';
    
class Welcome extends Component{
    constructor(props){
        super(props);
        this.state = {
            entryNote: '',
            sendingData: false,
            noteCount: 0
        }
    }

    createUser = (newUser) => {
        this.setState({
            sendingData: true
        })
        axios.post('https://lambda-notes-backend-mjk.herokuapp.com/api/welcome/register/', newUser).then(res => {
            this.setState({
                sendingData: false
            })
            localStorage.setItem('JWT', res.data.token)
            localStorage.setItem('username', res.data.username)
            this.props.history.push('/all-notes')
        }).catch(err => {alert(err.message); console.err(err.message)})
    }

    loginUser2 = (creds) => {
        this.setState({
            sendingData: false,
            entryNote: ''
        })
        axios.post('https://lambda-notes-backend-mjk.herokuapp.com/api/welcome/login', creds).then(res => {
            this.setState({
                sendingData: true
            })
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

    saveLocalNote = (e) => {
        console.log(e.target.value)
        e.preventDefault();
        localStorage.setItem(`textBody - ${this.state.noteCount}`, this.state.entryNote)
        this.setState({
            entryNote: '',
            noteCount: this.state.noteCount + 1
        })
        alert('notes saved locally. please sign in or register to save note permenantly.')
    }

    render(props){
        console.log(this.state)
        return(
            <WelcomeDiv>
                {/* <Route path="/welcome" component={Header} /> */}
                <div className="sign-in">
                    <Route path="/welcome/login" render={() => {
                        return <Login failed={(this.props.state.failedLoginAttempt)? true : false} 
                        sendingData={this.state.sendingData}
                        loginUser={this.loginUser2} />}} />
                    <Route path="/welcome/register" render={() => {
                        return <Register failed={this.props.state.failedRegistrationAttempt} 
                        sendingData={this.state.sendingData}
                        createUser={this.createUser} />}} />
                </div>

                <Route exact path="/welcome/" render={() => {
                        return <form onSubmit={this.saveLocalNote}>
                            <textarea 
                        type="text" 
                        name="entryNote" placeholder='have an idea? start typing...' 
                        onChange={this.inputHandler} value={this.state.entryNote} autoFocus>{this.value}</textarea>
                    <input type="submit" name="Save note" />
                </form>
                        }} />

                
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
    ${'' /* background-image: url(https://picsum.photos/1500/1500?image=${Math.floor((Math.random() * 1084) + 1)}); */}
    width: 100%;
    height: 100vh;
    ${'' /* ${flex('column')} */}
    form{
        textarea{
            background: rgba(255,255,255,0.15);
            border: none;
            padding: 20px;
            font-size: 20px;
            color: black;
            margin: 100px;
            width: 400px;
            height: 200px;
            ::placeholder{
                color: #F0EFEF;
                color: black;
                font-size: 35px;
            }
        }
    }
    .sign-in{
        z-index: 100;
    }
`;