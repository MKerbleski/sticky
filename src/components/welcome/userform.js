import React, {Component} from 'react';
import styled from 'styled-components';


export default class UserForm extends Component{
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
        this.props.loginOrRegister(this.state)
        this.setState({
            username: '',
            password: '',
        })
    }
    
    render(props){
        return(
            <UserFormDiv>
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
                        value={this.state.email}>{this.value}</input> */}
                    <input 
                        required
                        type="password"
                        name="password" 
                        placeholder="password" 
                        onChange={this.inputHandler}
                        value={this.state.password}>{this.value}</input>
                    {this.props.sendingData ? <p>sending credentials</p> : <input type="submit" />}
                </form>
            </UserFormDiv>
        )
    }
}

const UserFormDiv = styled.div`
    ${'' /* border: 1px solid red; */}
    form{
        display: flex;
        flex-direction: column;

    }
`;