import React , { Component } from 'react'
import styled from 'styled-components'

export default class BugsPage extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <BugsPageDiv> 
                <iframe title="bugForm" src="https://docs.google.com/forms/d/e/1FAIpQLSfzY1mF3viPZW6ZKJWTmY7f4hhJ_R9VeTbfZSu-CqK2F9nupA/viewform?embedded=true" width="640" height="751" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
            </BugsPageDiv>
        )
    }
}

const BugsPageDiv = styled.div`
    border: 1px solid red;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px;
`