import styled from 'styled-components';
import React from 'react';
import { DragSource, DropTarget, } from 'react-dnd';
import flow from 'lodash/flow'
import { LayerThreeSource } from "../index"

class NoteDetailGrandChild extends React.Component {
    render(){
        if (this.props.layerTwo){
            return (
                this.props.connectDragSource &&
                this.props.connectDropTarget &&
                    <NoteDetailGrandChildDiv 
                        innerRef={instance => {
                            this.props.connectDragSource(instance);
                            this.props.connectDropTarget(instance);}}
                        type="note"
                        onClick={(e) => {e.stopPropagation();}} 
                        style={{background: this.props.hover ? 'lightgreen' : null}} >              
                        <h4>{this.props.getFirstWord(this.props.layerTwo.text_body)}</h4>
                        <div className="layerThreeContainerAll">
                            {this.props.allNotes.map(layerThree => {
                                if (layerThree.parent_id === this.props.layerTwo.id){
                                    return <LayerThreeSource 
                                                key={layerThree.id}
                                                type="note"
                                                changeParent={this.props.changeParent} layerThree={layerThree} 
                                                onDrop={this.props.onDrop}
                                                getFirstWord={this.props.getFirstWord} />
                                } else {
                                    return null
                                }
                            })}
                        </div>                       
                    </NoteDetailGrandChildDiv>         
                )
        } else {
            return null
        }
    }
}

const targetObj = {
    drop(props) {
        const targetId = props.layerTwo.id;
        const type = props.type
        const pocket_items_attached = props.layerTwo.pocket_items_attached;
        const slack_items_attached = props.layerTwo.slack_items_attached;
        return ({
            targetId, type, pocket_items_attached, slack_items_attached
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
            return;
        }
        const sourceId = props.layerTwo.id;        
        const dropResult = monitor.getDropResult({shallow: true});
        props.onDrop(sourceId, dropResult.type, dropResult.targetId);
    }
};

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
    background: black;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-between;
    width: 100%;
    overflow: visible;
    h4 {
        border: 1px solid orange;
        margin: 0px;
        width: 100%;
        color: white;
    }
    .layerThreeContainerAll{
        width: 100%;
        border: 1px solid green;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: safe flex-start;
        ${'' /* overflow: hidden; */}
        .layerThreeContainer{
            border: 1px solid red;
            height: 25px;
            ${'' /* padding: 0 4px; */}
            width: 25px;
        }
    }
`;