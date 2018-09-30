import styled from 'styled-components';
import React, { Component } from 'react';
// import ReactDOM from 'react-dom'

import {connect} from 'react-redux';
import {getNotes, editNote} from '../actions';

import LayerOneTargetSource from './layerOneTargetSource';

class List extends Component {
    state = {
        activeNote: null,
    }

    componentDidMount(){
        this.props.getNotes();
        // document.addEventListener('mousedown', this.handleClick, false);
        
    }

    changeParent = (source_id, target_id) => {
        console.log('change target', 'sourceId: ', source_id, 'targetId: ', target_id)
        if(source_id !== target_id){
            this.props.editNote({id: source_id, parent_id: target_id})
            this.props.getNotes();
        }
    }

    render(){
        if (this.props.state.allNotes) {
            return (
                <ListDiv >
                    <h3>Page Status: {this.props.state.status}</h3>
                    <div 
                        className="layerOneNotesContainer" 
                        onClick={(event) => {
                            console.log('layerOneNotesContainer')
                        }}>
                        
                        {this.props.state.allNotes.map(layerOne => {
                            if(layerOne.parent_id === null){
                                return (
                                    //needs div here to stop propagation 
                                    <div key={layerOne.id} className="extraDiv" onClick={(e) => { e.stopPropagation(); }}>
                                        <LayerOneTargetSource  changeParent={this.changeParent} key={layerOne.id} layerOne={layerOne} allNotes={this.props.state.allNotes}  />
                                    </div>
                                )
                            } else 
                            {return null}
                        })}
                        
                       
                    </div>   
                </ListDiv>)
        } else {
            return (
                <div>
                    <p>loading...</p>
                </div>
            )
        }
    }
}

const mapStateToProps = store => {
    return {state:store};
 }
  
const mapDispatchToProps = {
    getNotes, 
    editNote
 }

export default connect(mapStateToProps, mapDispatchToProps)(List);

const ListDiv = styled.div`
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    .layerOneNotesContainer {
        background: lightgray;
        border: 1px solid green;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        height: 100%;
        padding: 25px;
        .extraDiv{
            border: 1px solid green;
            background: white;
        }
    }
`;

