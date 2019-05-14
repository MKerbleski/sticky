import React , { Component } from 'react'
import styled from 'styled-components'

export default class AdPage extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return(
            <AdPageDiv> 
                <h1>Advertise with us!</h1>
                <p>To advertise with us please submit <a href='null'>this</a> form.</p>
            </AdPageDiv>
        )
    }
}

const AdPageDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 100%;
`