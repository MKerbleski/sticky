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
                       <div className="slack-note-text">
                        {props.link.slack_text}
                    </div>
                    <div className="slack-note-link">
                        <a target="_blank" href={props.link.URL}>
                            go to Slack
                        </a>
                    </div>
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
  border: 1px solid green;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 3px;
    color: black;
    margin-left: 28px ;
    background: lightblue;
    .slack-note-text{
        ${'' /* border: 1px solid green; */}
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        overflow: hidden;
        margin-bottom: 2px;
    }
    .slack-note-link{
        ${'' /* border: 1px solid red; */}
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;

    }
`;
