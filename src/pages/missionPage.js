import React , { Component } from 'react'
import styled from 'styled-components'

export default class MissionPage extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <MissionPageDiv> 
                <h1>Our Mission</h1>
                <p>One of the biggest issues facing humanity at the moment is the organization of your menatal thoughts. With the advancement of technology we are still stuck with stickynotes or convoluted layers of folders.</p><br></br> We aim to change that.<br></br> Organize your mind. <p>Bring ideas to reality, whether that is a book, blog, website, or a mission to mars.</p>
                <p>collect</p>
                <p>organize</p>
                <p>do</p>
                <a href='/welcome/register'>Start now.</a>
            </MissionPageDiv>
        )
    }
}

const MissionPageDiv = styled.div`
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 100%;
`