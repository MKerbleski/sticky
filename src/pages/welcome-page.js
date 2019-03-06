import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Login from '../components/welcome/login';
import Register from '../components/welcome/register';
import { Link } from 'react-router-dom';

// import Header from './header';
// import { flex } from '../../styles/styl-utils.js'

import {
    createUser,
    loginUser,
    getUserData,
    addNote,
} from '../actions';
    
class WelcomePage extends Component{
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
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/welcome/register/`, newUser).then(res => {
            // console.log("create user in welcome route", res.data)
            this.setState({
                sendingData: false
            })
            localStorage.setItem('JWT', res.data.token)
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('sticky_user_id', res.data.sticky_user_id)
            if(localStorage.getItem('text_body')){
                this.newNote({text_body: localStorage.getItem('text_body')})
            } else {
                this.props.history.push(`/${res.data.username}`)
            }
            this.props.history.push(`/${res.data.username}`)
        }).catch(err => {console.log(err.message)})
    }

    loginUser = (creds) => {
        this.setState({
            sendingData: false,
            entryNote: ''
        })
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/welcome/login`, creds).then(res => {
            this.setState({
                sendingData: true
            })
            localStorage.setItem('JWT', res.data.token)
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('sticky_user_id', res.data.sticky_user_id)
            if(localStorage.getItem('text_body')){
                this.props.addNote({text_body: localStorage.getItem('text_body')})
            }
            this.props.history.push(`/${res.data.username}`)
            this.props.getUserData()
        }).catch(err => {console.log(err.message)})
    }
    
    inputHandler = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })        
    }

    saveLocalNote = (e) => {
        e.preventDefault();
        localStorage.setItem(`text_body`, this.state.entryNote)
        this.setState({
            entryNote: '',
        })
        this.props.history.push('/welcome/login')
        // alert('Note was saved locally. Please login or register to save note permenantly.')asdf
      }

    render(){
        return(
            <WelcomePageDiv>
                <Route 
                    path="/welcome/login" 
                    render={() => {
                        return <Login 
                            failed={(this.props.store.failedLoginAttempt)
                                ? true 
                                : false} 
                            sendingData={this.state.sendingData}
                            loginUser={this.loginUser} 
                        />
                    }} 
                />
                <Route 
                    path="/welcome/register" 
                    render={() => {
                        return <Register 
                            failed={this.props.store.failedRegistrationAttempt} 
                            sendingData={this.state.sendingData}
                            createUser={this.createUser} 
                        />
                    }}
                />
                <Route 
                    exact 
                    path="/welcome/" 
                    render={() => {
                        return  (
                            <form onSubmit={this.saveLocalNote}>
                                <textarea 
                                    type="text" 
                                    name="entryNote" 
                                    placeholder='have an idea? start typing...' 
                                    onChange={this.inputHandler} 
                                    value={this.state.entryNote} 
                                    autoFocus
                                >
                                    {this.value}
                                </textarea>
                                <input type="submit" name="Save note" />
                            </form>
                        )
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

const mapStateToProps = store => {
    return {store: store};//state is really props & store is store
}
  
const mapDispatchToProps = {
    getUserData,
    addNote,
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)

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
    /* height: 90vh; */
    ${'' /* ${flex('column')} */}
    form{
        border: 1px solid green;
        margin: 2px;
        textarea{
            ${'' /* border: 1px solid green; */}
            background: rgba(255,255,255,0.15);
            border: none;
            /* padding: 20px; */
            font-size: 20px;
            color: black;
            margin: 50px;
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
        ${'' /* z-index: 100; */}
    }
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