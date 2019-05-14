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
                <p>Enabling people to solve humanities biggest challenges, quicker. One of the biggest issues with the exponential growth is the organization of your menatal thoughts and digital encounters. With the advancement of technology we are still stuck with stickynotes or convoluted layers of folders.</p>
                <br/> 
                <p>We aim to change that.</p>
                <br/>
                <p>Organize your mind.</p>
                <p>Bring ideas to reality, whether that is a book, blog, website, or a mission to mars.</p>
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