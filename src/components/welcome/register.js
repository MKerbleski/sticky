import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import UserForm from './userform.js';

export default class Register extends Component{

    render(props){
        return(
            <RegisterDiv>
                <h1>Register</h1>
                <p>{this.props.failed ? 'registration failed, please try again. Most likley the username is not availible': null}</p>
                {/* <UserForm 
                sendingData={this.props.sendingData}
                loginOrRegister={this.props.createUser}/> */}
                <p>Registration is currently disabled. Please <Link to="/welcome/login">Login</Link> or contact Mike at <a href="mailto:resume@kerble.ski">resume@kerble.ski</a> for demo credentials.</p>
            </RegisterDiv>
        );
    };
};

const RegisterDiv = styled.div`
    ${'' /* border: 1px solid red; */}
`;