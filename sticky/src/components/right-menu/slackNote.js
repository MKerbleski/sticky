import styled from 'styled-components';
import React from 'react';
import {DragSource} from 'react-dnd';


const SlackNote = (props) => {
    if (props.star){
        return (
            props.connectDragSource(
                <div>

                <SlackNoteDiv type="link" style={{
                         opacity: props.isDragging ? '0.25' : '1',
                         border: props.isDragging ? '1px dashed gray': '1px solid black',
                        //  color: props.didDrop ? "red" : "green"
                        }}>
                        <a target="_blank" href={props.star.message.permalink}> view on Slack
                        </a>
                       <p>{props.star.message.text}</p>
                    </SlackNoteDiv>
                </div>
            )
        )
    } else {
        return (null)
    }
 }

 const sourceObj = {
    beginDrag(props) {
        const {link} = props.star
        const type = props.type
        return ({
            link, type //this gets sent to the drop item // is null in this example because react-dnd is overkill
        });
    },

    endDrag(props, monitor) {// this takes props mounted on beginDrag
        if(!monitor.didDrop()){
            return ;
        }
        // console.log(props, 'superSubDropProps', monitor)
        const link = props.star.message;
        console.log('\n --- link', link)
        let addSlackLink = {
            slack_text: link.text,
            slack_type: link.type,
            slack_user: link.user,
            URL: link.permalink,
            API: 'slack',
            isLink: true,
        }
        const selfType = props.type
        // console.log(childId, 'childId')
        const parentId = monitor.getDropResult();
        // console.log(parentId, 'parentId')
        props.onDrop(addSlackLink, selfType, parentId.targetId);
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
