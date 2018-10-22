import styled from 'styled-components';
import React from 'react';

import { DragSource, DropTarget, } from 'react-dnd';
import flow from 'lodash/flow'


// import SubNote from "./subNote"
import LayerThreeSource from "./note-detail-great-grand-child"

 const targetObj = {
     drop(props) {
        console.log(props.hover)
        const targetId = props.layerTwo.id;
        const type = props.type
        console.log('L2-targetId: ', targetId)
        return ({
            targetId, type
        });

    }
  }
  
  const sourceObj = {
    beginDrag(props) {
        const sourceId = props.layerTwo
        return ({
            sourceId //this gets sent to the drop item // is null in this example because react-dnd is overkill
        });
    },

    endDrag(props, monitor) {// this takes props mounted on beginDrag
        if(!monitor.didDrop()){
            return ;
        }
        const sourceId = props.layerTwo.id;
        // console.log(childId, 'childId')
        
        const dropResult = monitor.getDropResult({shallow: true});
        console.log(dropResult, 'dropResult')
        console.log(props, 'props')
        props.onDrop(sourceId, dropResult.type, dropResult.targetId);
    }
  };


class NoteDetailGrandChild extends React.Component {
    render(props){
        // console.log(this.props.hover)
        // console.log(this.props.hoverShallow)
        // console.log(this.props.highlighted)
        const {
            connectDragSource, 
            connectDropTarget, 
        } = this.props

        if (this.props.layerTwo){
            return (
                connectDragSource &&
                connectDropTarget &&
                connectDragSource(
                connectDropTarget(
                    <div className="layerTwoContainer">
                        <NoteDetailGrandChildDiv 
                            type="note"
                            onClick={(e) => {e.stopPropagation();}} 
                            style={{background: this.props.hover ? 'lightgreen' : null}}>
                            {/* <h3>{this.props.layerTwo.title}</h3> */}
                            
                            <h4>{this.props.getFirstWord(this.props.layerTwo.textBody)}</h4>
                            <div className="layerThreeContainerAll">
                               {this.props.allNotes.map(layerThree => {
                                    if (layerThree.parent_id === this.props.layerTwo.id){
                                        return (
                                                <LayerThreeSource 
                                                    key={layerThree.id}
                                                    type="note"
                                                    changeParent={this.props.changeParent} layerThree={layerThree} 
                                                    onDrop={this.props.onDrop}
                                                    getFirstWord={this.props.getFirstWord}
                                                    />
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                            </div>                       
                        </NoteDetailGrandChildDiv>         
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
        hover: monitor.isOver(),
        hoverShallow: monitor.isOver({shallow: true})
    })), 

    DragSource('item', sourceObj, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))

)(NoteDetailGrandChild);


const NoteDetailGrandChildDiv = styled.div`
    border: 2px solid black;
    border-radius: 5px;
    ${'' /* height: 90px; */}
    background: lightgrey;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    width: 100%;
    overflow: visible;
    h4 {
        border: 1px solid orange;
        margin: 0px;
        width: 100%;
        color: black;
    }
    .layerThreeContainerAll{
        width: 100%;
        border: 1px solid green;
        ${'' /* height: 500px; */}
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        ${'' /* overflow: hidden; */}
        .layerThreeContainer{
            border: 1px solid red;
            height: 25px;
            padding: 0 4px;
            width: 25%;
        }
    }
`;