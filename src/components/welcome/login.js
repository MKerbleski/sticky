import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
    loginUser,
    clearUserStatus,
} from '../../actions';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    componentWillUnmount(){
        this.props.clearUserStatus()
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submit = (e) => {
        e.preventDefault();
        this.props.loginUser(this.state, this.props.redirect)
        this.setState({
            username: '',
            password: '',
        })
    }
    
    render(){
        return(
            <LoginDiv>
                <h1>Login</h1>
                <p>
                    {this.props.failed 
                        ?   'login failed, please try again or register'
                        :   null}
                </p>
                <form onSubmit={this.submit}>
                    <input 
                        autoFocus
                        required
                        type="text"
                        name="username" 
                        placeholder="username" 
                        onChange={this.inputHandler}
                        value={this.state.username}>{this.value}</input>
                    <input 
                        required
                        type="password"
                        name="password" 
                        placeholder="password" 
                        onChange={this.inputHandler}
                        value={this.state.password}>{this.value}</input>
                    {this.props.sendingData ? <p>sending credentials</p> : <input type="submit" />}
                </form>
            </LoginDiv>
        )
    }
}

const mapStateToProps = store => {
    return { store: store };
}
  
const mapDispatchToProps = {
    loginUser,
    clearUserStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const LoginDiv = styled.div`
    ${'' /* border: 1px solid red; */}
`;