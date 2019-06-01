import React , { Component } from 'react'
import styled from 'styled-components'

export default class CareersPage extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <CareersPageDiv> 
                <h1>Opportunities</h1>
                <h3>Seem like a good fit?</h3>
                <p>We are always looking to bring on the right person.</p>
                <p>To start, submit an short paragraph on what you would bring to the table <a href='null'>here</a>.</p>
            </CareersPageDiv>
        )
    }
}

const CareersPageDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 100%;
`