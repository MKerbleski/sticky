import styled from 'styled-components';
import React from 'react';
import {DragSource} from 'react-dnd';

import LayerThree from './layerThreeSource.js';

const LayerTwoTarget = (props) => {
        if (props.layerTwo){
            return (
                props.connectDragSource(
                    <div>
                        <LayerTwoDiv style={{
                             opacity: props.isDragging ? '0.25' : '1',
                             border: props.isDragging ? '1px dashed gray': '1px solid black',
                             }}>
                            <h6>{props.layerTwo.title}</h6>
                            <p>{props.layerTwo.text}</p>
                            <div className="layerThreeContainer">
                                {props.allNotes.map(layerThree => {
                                    if (layerThree.parent_id === props.layerTwo.id){
                                        return (
                                            <div key={layerThree.id} >
                                                <LayerThree changeParent={props.changeParent} layerThree={layerThree} />
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
        } else {
            return (null)
        }
 }

 const sourceObj = {
    beginDrag(props) {
        const sourceId = props.layerTwo.id
        console.log('sourceId: ', sourceId)
        return ({
            sourceId //this gets sent to the drop item // is null in this example because react-dnd is overkill
        });
    },
    
    endDrag(props, monitor) {// this takes props mounted on beginDrag
        if(!monitor.didDrop()){
            return ;
        }
        const sourceId = props.layerTwo.id;
        // console.log('L2-sourceId: ', sourceId)
        const target = monitor.getDropResult();
        // console.log('L2-targetId', target.targetId)
        props.changeParent(sourceId, target.targetId);
    },
  };
  
  const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    // didDrop: monitor.didDrop(),
  });
  
export default DragSource('item', sourceObj, collect)(LayerTwoTarget);

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