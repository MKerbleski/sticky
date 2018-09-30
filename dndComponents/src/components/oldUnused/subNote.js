import styled from 'styled-components';
import React, { Component } from 'react';

import {connect} from 'react-redux';
import {getNotes} from '../actions';


class SubNote extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        console.log(this.props)
            return (
                <SubNoteDiv>
                   <h6>{this.props.subNote.title}</h6>
                   <p>{this.props.subNote.text}</p>
                   <div className="superSubContainer">
                        {this.props.state.allNotes.map(superSub => {
                            if (superSub.parent_id == this.props.subNote.id){
                                return (
                                    <div className="superSub">
                                        {superSub.title}
                                    </div>
                                )
                            } else {
                                return null
                            }
                        })}
                   </div>
                </SubNoteDiv>        
            )        
    }
 }

const mapStateToProps = store => {
    return {state: store};
 }
  
const mapDispatchToProps = {
    getNotes
 }

export default connect(mapStateToProps, mapDispatchToProps)(SubNote);

const SubNoteDiv = styled.div`
    border: 1px solid green;
    margin: 10px;
    padding: 10px;
    max-width: 100px;
    .superSubContainer{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .superSub{
            border: 1px solid black;
            border-radius: 50px;
            width: 40px;
            height: 40px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 8px;
            background-color: lightgray;

        }
    }
    ${'' /* width: 200px;
    height: 50px; */}
`;