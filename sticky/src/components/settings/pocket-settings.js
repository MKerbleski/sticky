import React , { Component } from 'react'
import styled from 'styled-components'

export default class PocketSettings extends Component {
    constructor(props){
        super(props)
        this.state = {
            isApiConnected: this.props.name
        }
    }

    render(){
        return(
            <PocketSettingsDiv> 
                <h5>Pocket!</h5>
            </PocketSettingsDiv>
        )
    }
}

const PocketSettingsDiv = styled.div`
    border: 1px solid red;
`