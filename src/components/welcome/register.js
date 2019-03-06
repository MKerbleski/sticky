import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import {
    createUser,
} from '../../actions';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
        };
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        if(event.target.name === 'username'){
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/welcome/isthis/${event.target.value}/availble`).then(res => {
                console.log(res.data.message)
                // dispatch({type: USERNAME_AVAILIBLE, payload: res.data})
                if(res.data.availble){
                    this.setState({
                        cool: true,
                        usernameAvailblity: " :) Avalible!"
                    })
                } else {
                    this.setState({
                        cool: false,
                        usernameAvailblity: "  :( This username has been claimed"
                    })
                }
            }).catch(err => {
                console.log(err)
                // dispatch({type: ERROR, payload: err})
            })
        }
    }

    submit = (e) => {
        e.preventDefault();
        if(this.state.password === this.state.password2 && this.state.cool){
            this.props.createUser({username: this.state.username, password: this.state.password}, this.props.redirect)
            this.setState({
                username: '',
                password: '',
                password2: '',
            })
        } else {
            this.setState({
                fixForm: true
            })
        }
    }
    render(){
        return(
            <RegisterDiv>
                <h1>Register</h1>
                <p>
                    {this.props.failed 
                        ?   'registration failed, please try again. Most likley the username is not availible'
                        : null}
                </p>
                {this.state.fixForm ? <p>You need to fix the form</p> : null}
                <form onSubmit={this.submit}>
                    <div>
                        <input 
                            autoFocus
                            required
                            type="text"
                            name="username" 
                            placeholder="username" 
                            onChange={this.inputHandler}
                            value={this.state.username}>{this.value}</input>
                            <label>{this.state.username.length > 0 ? this.state.usernameAvailblity : null }</label>
                    </div>
                    {/* <div>
                        <input 
                            required
                            type="text"
                            name="email" 
                            placeholder="email" 
                            onChange={this.inputHandler}
                            value={this.state.email}>{this.value}</input>
                    </div> */}
                    <div>
                        <input 
                            required
                            type="password"
                            name="password" 
                            placeholder="password" 
                            onChange={this.inputHandler}
                            value={this.state.password}>{this.value}</input>
                            {/* <label>password</label> */}
                    </div>
                    <div>
                        <input 
                            required
                            type="password"
                            name="password2" 
                            placeholder="password" 
                            onChange={this.inputHandler}
                            value={this.state.password2}>{this.value}</input>
                            <label>{this.state.password ? this.state.password &&
                                this.state.password === this.state.password2 
                                    ? 'Passwords Match!' 
                                    : "password must match" : null}</label>
                        </div>
                        <div>
                            {this.props.sendingData ? <p>sending credentials</p> : <input type="submit" />}
                        </div>
                </form>
                <p>
                    Registration is currently disabled. Please 
                    <Link to="/welcome/login">
                        Login
                    </Link>
                     or contact Mike at 
                     <a href="mailto:resume@kerble.ski">resume@kerble.ski</a>
                     for demo credentials.
                </p>
            </RegisterDiv>
        );
    };
};

const mapStateToProps = store => {
    return {store: store};//state is really props & store is store
}
  
const mapDispatchToProps = {
    createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

const RegisterDiv = styled.div`
    form{
        border: 1px solid red;
        display: flex;
        flex-direction: column;

    }
`;