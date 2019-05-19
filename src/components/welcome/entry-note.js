import React , { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

import {
    mainThemePrimary
} from '../../styles'

export default class EntryNote extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentWillUnmount(){
        if(this.state.entryNote){
            localStorage.setItem(`text_body`, this.state.entryNote)
        }
    }

    inputHandler = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })        
    }

    render(){
        return(
            <EntryNoteDiv> 
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
                </form> 
                {this.state.entryNote  
                    ?    <div className="links">
                            <Link className="link" to="/welcome/login">Login</Link>
                            <Link className="link" to="/welcome/register">Register</Link>
                        </div>
                    :   null
                }
            </EntryNoteDiv>
        )
    }
}

const EntryNoteDiv = styled.div`
    /* border: 1px solid red; */
    margin: 2px;
    form{
        /* border: 1px solid green; */
        margin: 2px;
        textarea{
            border: 1px solid black;
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
    .links{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        .link{
            background: ${mainThemePrimary};
            padding: 15px;
            border-radius: 20px;
            margin: 4px;
            color: black;
            font-size: 20px;
            text-decoration: none;
            :hover{
                text-decoration: underline;
            }
        }
    }
`