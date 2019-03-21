import React , { Component } from 'react'
import styled from 'styled-components'

export default class AboutPage extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <AboutPageDiv> 
                <h2>About Page</h2>
                <li>This is Sticky's about page!</li>
                <p>lambda school link</p>
                <a href="http://fbuy.me/mi5Gf">Lambda School</a>
            </AboutPageDiv>
        )
    }
}

const AboutPageDiv = styled.div`
    border: 1px solid red;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`