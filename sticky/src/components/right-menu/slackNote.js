import styled from 'styled-components';
import React from 'react';
import {DragSource} from 'react-dnd';


const SlackNote = (props) => {
    if (props.star){
        return (
            props.connectDragSource(
                <a target="_blank" href={props.star.message.permalink}> 
                    <SlackNoteDiv type="note" style={{
                         opacity: props.isDragging ? '0.25' : '1',
                         border: props.isDragging ? '1px dashed gray': '1px solid black',
                        //  color: props.didDrop ? "red" : "green"
                        }}>
                       <p>{props.star.message.text}</p>
                    </SlackNoteDiv>
                </a>
            )
        )
    } else {
        return (null)
    }
 }

 const sourceObj = {
    beginDrag(props) {
        const {permalink} = props.star.message
        const type = props.type
        return ({
            permalink, type //this gets sent to the drop item // is null in this example because react-dnd is overkill
        });
    },

    endDrag(props, monitor) {// this takes props mounted on beginDrag
        if(!monitor.didDrop()){
            return ;
        }
        // console.log(props, 'superSubDropProps', monitor)
        const permalink = props.star.message;
        // console.log(childId, 'childId')
        const parentId = monitor.getDropResult();
        // console.log(parentId, 'parentId')
        props.onDrop(permalink, parentId.type, parentId.targetId);
    },
  };

  const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    // didDrop: monitor.didDrop(),
  });

export default DragSource('item', sourceObj, collect)(SlackNote);

const SlackNoteDiv = styled.div`
    border: 1px solid green;
    font-size: 10px;
    ${'' /* margin: 10px; */}
    ${'' /* padding: 10px; */}
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
        padding: 3px;
        color: black;
        margin-left: 28px ;
`;
