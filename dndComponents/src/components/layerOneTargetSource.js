import styled from 'styled-components';
import React from 'react';

import { DragSource, DropTarget, } from 'react-dnd';
import flow from 'lodash/flow'


// import SubNote from "./subNote"
import LayerTwoTargetSource from "./layerTwoTargetSource"
// import { createChildContext } from 'react-dnd/lib/DragDropContext';

//need to find a way to get props in here
 const targetObj = {
     drop(props, monitor) {
         //so this somehow allows other items to be dropped in a nested child component
                 const hover =  monitor.isOver({shallow:true})
                //  const hoverfalse =  monitor.isOver({shallow:false})
    //              console.log(hover)
    //              console.log(hoverfalse)
    //    console.log(props)
     if(hover){//this disables layer one droping if there is a nested child

        const targetId = props.layerOne.id;
        console.log('targetId: ', targetId)
        return ({
            targetId
        });
    }
    },
    hover(props, monitor){
    }
  }
  
  const sourceObj = {
    beginDrag(props) {
        const sourceId = props.layerOne
        return ({
            sourceId //this gets sent to the drop item // is null in this example because react-dnd is overkill
        });
    },

    endDrag(props, monitor) {// this takes props mounted on beginDrag
        if(!monitor.didDrop()){
            return ;
        }
        const sourceId = props.layerOne.id;
        // console.log(childId, 'childId')
        const dropResult = monitor.getDropResult();
        // console.log(dropResult, 'dropResult')
        props.changeParent(sourceId, dropResult.targetId);
    },
  };


class LayerOneTargetSource extends React.Component {
    render(props){
        // console.log(this.props.hover)
        const {
            connectDragSource, 
            connectDropTarget, 
        } = this.props

        if (this.props.layerOne){
            return (
                connectDragSource &&
                connectDropTarget &&
                connectDragSource(
                connectDropTarget(
                    <div>
                        <LayerOneDiv>
                            <h2>{this.props.layerOne.title}</h2>
                            <p>{this.props.layerOne.text}</p>
                            <div className="layerTwoContainer" style={{background: this.props.hover ? 'lightgreen' : null}}>
                                {this.props.allNotes.map(layerTwo => {
                                    if (layerTwo.parent_id === this.props.layerOne.id){
                                        return (
                                            <div key={layerTwo.id} >
                                                <LayerTwoTargetSource changeParent={this.props.changeParent} layerTwo={layerTwo} allNotes={this.props.allNotes} />
                                            </div>
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                            </div>                       
                        </LayerOneDiv>         
                    </div>
                    )
                    )
                )
        } else {
            return (null)
        }
    }
}

export default flow(

    DropTarget('item', targetObj, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        highlighted: monitor.canDrop(),
        hover: monitor.isOver({shallow:true}),
        hoverFalse: monitor.isOver()
    })), 
    
    DragSource('item', sourceObj, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))

)(LayerOneTargetSource);


const LayerOneDiv = styled.div`
    background: gray;
    ${'' /* color: white; */}
    border: 1px solid blue;
    ${'' /* margin: 10px; */}
    max-width: 310px;
    p {
        margin: 5px;
    }
    .layerTwoContainer{
        background: lightgray;
        border: 1px solid purple;
        margin: 5px;
        display: flex;
        flex-direction: row;
        
        flex-wrap: wrap;
        max-width: 100%;
    }
`;