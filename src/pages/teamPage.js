import React , { Component } from 'react'
import styled from 'styled-components'

import {
    flexCenter
} from '../styles/'

import 
    headshot
 from '../img/22307921.jpg'

export default class Bios extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <BiosDiv> 
                <h1>Say hello to our team!</h1>
                <p>We are hiring! Submit an application <a>here</a>.</p>
                <img src={headshot} ></img>
            </BiosDiv>
        )
    }
}

const BiosDiv = styled.div`
    /* border: 1px solid red; */
    width: 100%;
    ${flexCenter('column')}
`