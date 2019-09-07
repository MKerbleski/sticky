import React , { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

import {
    mainThemePrimary,
    border
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
                {/* <form onSubmit={this.saveLocalNote}>
                    <textarea 
                        type="text" 
                        name="entryNote" 
                        placeholder='have an idea? start typing! worry about the account later' 
                        onChange={this.inputHandler} 
                        value={this.state.entryNote} 
                        autoFocus
                    >
                        {this.value}
                    </textarea>
                </form> 
                {this.state.entryNote  
                    ?    <div className="links">
                            <Link className="link" to="/welcome/register">Register</Link>
                            <Link className="link" to="/welcome/login">Login</Link>
                        </div>
                    :   null
                } */}
                <iframe className="video" margin="10px" width="50%" height="50%" src="https://www.youtube.com/embed/B1XURIy2HSI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </EntryNoteDiv>
        )
    }
}

const EntryNoteDiv = styled.div`
    /* border: 1px solid red; */
    margin: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    /* width: 80vw; */
    .video{
        margin: 20px;
        width: 75vw;
        height: 75vh;
    }
    form{
        /* border: 1px solid green; */
        margin: 2px;
        textarea{
            border: 1px solid black;
            background: rgba(255,255,255,0.40);
            border: none;
            /* padding: 20px; */
            font-size: 20px;
            border-radius: 10px;
            color: black;
            margin: 50px;
            /* width: 80%; */
            max-width: 400px;
            min-height: 250px;
            padding: 20px;
            text-align: center;
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
        width: 85vw;
        /* ${border('red')} */
        .link{
        /* ${border()} */
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