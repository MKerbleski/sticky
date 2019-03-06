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
            email: '',
            password2: '',
            key: '',
        };
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        if(event.target.name === 'username' && event.target.value.length > 0){
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
                        usernameAvailblity: " :( This username has been claimed"
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
            this.props.createUser({username: this.state.username, password: this.state.password, email: this.state.email}, this.props.redirect)
            this.setState({
                username: '',
                email: '',
                password: '',
                password2: '',
            })
        } else {
            this.setState({
                fixForm: true
            })
        }
        
    }
    
    check = (e) => {
        e.preventDefault();
        if(process.env.REACT_APP_REGISTRATION_KEY === this.state.key){
            this.setState({
                key: true,
                accessKey: true

            })
        } else {
            this.setState({
                invalidKey: true
            })
        }
    }

    render(){
        return(
            <RegisterDiv>
                <h1>Registration</h1>
                {this.state.accessKey 
                    ?   <div>
                            {this.state.fixForm 
                                ?   <p>You need to fix the form</p> 
                                :   null
                            }
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
                                <div>
                                    <input 
                                        required
                                        type="email"
                                        name="email" 
                                        placeholder="email" 
                                        onChange={this.inputHandler}
                                        value={this.state.email}>{this.value}</input>
                                </div>
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
                        </div>
                    :   <div>
                            <p>Registration is open to users willing to give feedback.</p>
                            <p>Please <Link to="/welcome/login">
                                Login</Link> or email Mike at <a href="mailto:resume@kerble.ski">resume@kerble.ski</a> to request an key and help test the site!
                            </p>
                            <form onSubmit={this.check}>
                                <div>
                                    <label>Access Key: </label>
                                    <input 
                                        name="key" 
                                        placeholder="Access Key" 
                                        onChange={this.inputHandler}
                                        value={this.state.key}>{this.value}</input>
                                        <input type="submit" />
                                </div>
                                {this.state.invalidKey 
                                    ?   <p>Invalid key, try again.</p> 
                                    :   null
                                }
                            </form>
                        </div>
                       
                }
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
        /* border: 1px solid red; */
        display: flex;
        flex-direction: column;
    }
`;

