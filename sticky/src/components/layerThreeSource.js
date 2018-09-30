import styled from 'styled-components';
import React from 'react';
import {DragSource} from 'react-dnd';


const LayerThreeSource = (props) => {
    if (props.layerThree){
        return (
            props.connectDragSource(
                <div> 
                    <LayerThreeDiv style={{
                         opacity: props.isDragging ? '0.25' : '1',
                         border: props.isDragging ? '1px dashed gray': '1px solid black',
                         color: props.didDrop ? "red" : "green"}}>
                       <h6>{props.layerThree.title}</h6>
                    </LayerThreeDiv>
                </div>
            )
        )
    } else {
        return (null)
    }
 }

 const sourceObj = {
    beginDrag(props) {
        const {childId} = props.layerThree
        return ({
            childId //this gets sent to the drop item // is null in this example because react-dnd is overkill
        });
    },

    endDrag(props, monitor) {// this takes props mounted on beginDrag
        if(!monitor.didDrop()){
            return ;
        }
        // console.log(props, 'superSubDropProps', monitor)
        const childId = props.layerThree.id;
        // console.log(childId, 'childId')
        const parentId = monitor.getDropResult();
        // console.log(parentId, 'parentId')
        props.changeParent(childId, parentId.targetId);
    },
  };

  const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    // didDrop: monitor.didDrop(),
  });

export default DragSource('item', sourceObj, collect)(LayerThreeSource);

const LayerThreeDiv = styled.div`
    background: lightgray;
    margin: 10px;
    padding: 10px;
    max-height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
