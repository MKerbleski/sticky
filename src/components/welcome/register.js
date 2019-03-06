import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    createUser,
} from '../../actions';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submit = (e) => {
        e.preventDefault();
        this.props.createUser(this.state)
        this.setState({
            username: '',
            password: '',
        })
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
                <form onSubmit={this.submit}>
                    <input 
                        autoFocus
                        required
                        type="text"
                        name="username" 
                        placeholder="username" 
                        onChange={this.inputHandler}
                        value={this.state.username}>{this.value}</input>
                    {/* <input 
                        required
                        type="text"
                        name="email" 
                        placeholder="email" 
                        onChange={this.inputHandler}
                        value={this.state.email}>{this.value}</input>
                    <input 
                        required
                        type="password"
                        name="password" 
                        placeholder="password" 
                        onChange={this.inputHandler}
                        value={this.state.password}>{this.value}</input> */}
                    <input 
                        required
                        type="password"
                        name="password" 
                        placeholder="password" 
                        onChange={this.inputHandler}
                        value={this.state.password}>{this.value}</input>
                    {this.props.sendingData ? <p>sending credentials</p> : <input type="submit" />}
                </form>
                <p>Registration is currently disabled. Please <Link to="/welcome/login">Login</Link> or contact Mike at <a href="mailto:resume@kerble.ski">resume@kerble.ski</a> for demo credentials.</p>
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
    ${'' /* border: 1px solid red; */}
`;