import React , { Component } from 'react'
import styled from 'styled-components'

export default class Deleted extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <DeletedDiv> 
                <h1>this is the deleted div</h1>
            </DeletedDiv>
        )
    }
}

const DeletedDiv = styled.div`
    border: 1px solid red;
`