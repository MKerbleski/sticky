import React , { Component } from 'react'
import styled from 'styled-components'
import { NoteDetailParent } from './index.js'
export default class NoteDetailPage extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        // this.getNote
    }

    render(){
        return(
            <NoteDetailPageDiv> 
                <NoteDetailParent />    
            </NoteDetailPageDiv>
        )
    }
}

const NoteDetailPageDiv = styled.div`
    border: 1px solid red;
`