import styled from 'styled-components';
import React from 'react';

import { DropTarget } from 'react-dnd'; 

// import SubNote from "./subNote"
import LayerTwoSource from "./layerTwoSource"

const LayerOneTarget = (props) => {
    if (props.layerOne){
        return (
            props.connectDropTarget(
                <div>
                    <LayerOneDiv style={{background: props.overOnly ? 'lightgreen' : null}}>
                        <h2>{props.layerOne.title}</h2>
                        <p>{props.layerOne.text}</p>
                        <div className="layerTwoContainer">
                            {props.allNotes.map(layerTwo => {
                                if (layerTwo.parent_id === props.layerOne.id){
                                    return (
                                        <div key={layerTwo.id} >
                                            <LayerTwoSource changeParent={props.changeParent} layerTwo={layerTwo} allNotes={props.allNotes} />
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
    } else {
        return (null)
    }
 }

 const specObj = {
    drop(props) {
    //   console.log(props)
      const targetId = props.layerOne.id;
      console.log('targetId: ', targetId)
      return ({
        targetId
      });
    }
  }
  
  const collect = (connect,  monitor) => ({
    connectDropTarget: connect.dropTarget(),
    highlighted: monitor.canDrop(),
    overOnly: monitor.isOver({shallow:false}),
  });
  
export default DropTarget('item', specObj, collect)(LayerOneTarget);

const LayerOneDiv = styled.div`
    border: 1px solid blue;
    margin: 10px;
    max-width: 310px;
    p {
        margin: 5px;
    }
    .layerTwoContainer{
        border: 1px solid purple;
        margin: 5px;
        display: flex;
        flex-direction: row;
        
        flex-wrap: wrap;
        max-width: 100%;
    }
`;