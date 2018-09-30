import styled from 'styled-components';
import React from 'react';

import { DragSource, DropTarget, } from 'react-dnd';
import flow from 'lodash/flow'


// import SubNote from "./subNote"
import LayerThreeSource from "./layerThreeSource"


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
        console.log(dropResult, 'L@-dropResult')
        props.onDrop(sourceId, dropResult.type, dropResult.targetId);
    }
  };


class LayerTwoTargetSource extends React.Component {
    render(props){
        console.log(this.props.hover)
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
                    <div>
                        <LayerTwoDiv 
                            type="note"
                            onClick={(e) => {e.stopPropagation();}} 
                            style={{background: this.props.hover ? 'lightgreen' : null}}>
                            <h2>{this.props.layerTwo.title}</h2>
                            <p>{this.props.layerTwo.text}</p>
                            <div className="layerThreeContainer">
                               {this.props.allNotes.map(layerThree => {
                                    if (layerThree.parent_id === this.props.layerTwo.id){
                                        return (
                                            <div key={layerThree.id} >
                                                <LayerThreeSource 
                                                    type="note"
                                                    changeParent={this.props.changeParent} layerThree={layerThree} 
                                                    onDrop={this.props.onDrop}
                                                    />
                                            </div>
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                            </div>                       
                        </LayerTwoDiv>         
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

)(LayerTwoTargetSource);


const LayerTwoDiv = styled.div`
    border: 1px solid green;
    margin: 10px;
    padding: 10px;
    max-width: 100px;
    background: white;
    .layerThreeContainer{
        border: 1px solid red;
        background: gray;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        ${'' /* overflow: hidden; */}
    }
`;