import styled from 'styled-components';
import React from 'react';
import {DragSource} from 'react-dnd';


const LinkSource = (props) => {
    if (props.link){
        console.log(props.link)
        return (
            props.connectDragSource(
                <div> 
                    <LinkSourceDiv type="note" style={{
                         opacity: props.isDragging ? '0.25' : '1',
                         border: props.isDragging ? '1px dashed gray': '1px solid black',
                        //  color: props.didDrop ? "red" : "green"
                        }}>
                       <p>slack_text: {props.link.slack_text}</p>
                       <a href={props.link.URL}>view in slack</a>
                    </LinkSourceDiv>
                </div>
            )
        )
    } else {
        return (null)
    }
 }

 const sourceObj = {
    beginDrag(props) {
        const childId = props.link.id
        const type = props.type
        return ({
            childId, type //this gets sent to the drop item // is null in this example because react-dnd is overkill
        });
    },

    endDrag(props, monitor) {// this takes props mounted on beginDrag
        if(!monitor.didDrop()){
            return ;
        }
        // console.log(props, 'superSubDropProps', monitor)
        const childId = props.link.id;
        // console.log(childId, 'childId')
        const parent = monitor.getDropResult();
        // console.log(parentId, 'parentId')
        props.onDrop(childId, parent.type, parent.targetId);
    },
  };

  const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    // didDrop: monitor.didDrop(),
  });

export default DragSource('item', sourceObj, collect)(LinkSource);

const LinkSourceDiv = styled.div`
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
`;
