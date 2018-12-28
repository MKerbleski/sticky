import styled from 'styled-components';
import React from 'react';
import { DragSource } from 'react-dnd';
import p from 'react-markdown';
import { apiNote } from '../../styles/styl-utils'
import moment from 'moment'


const SlackNote = (props) => {
    let note
    if(props.type === "link"){
        note = props.note
    } else {
        note = props.note
    }
    let time = note.ts.slice(0, 10)
    if (props){
        return (
            <SlackNoteDiv 
                innerRef={instance => props.connectDragSource(instance)}
                type="link"
                style={{
                    opacity: props.isDragging ? '0.25' : '1',
                    border: props.isDragging ? '1px dashed gray': '1px solid black'}}>
                <div className="slack-note-top">
                    <strong>{note.slack_user_name}</strong>
                    <div className="status">
                        <span>{note.is_pinned ? "pin" : null}</span>
                        <span>{note.is_starred ? "star" : null}</span>
                    </div>
                </div> 
                <div className="slack-note-middle">
                    <p className="slack-text">{note.type === "message" ? note.text : "error at note text"}</p>
                </div> 
                <span className="slack-note-bottom">
                    <p className="slack-time">{time}</p>
                    <a target="_blank" href={note.permalink}>Link to Slack</a>
                </span>
            </SlackNoteDiv>
        )
    } else {
        return null
    }
 }

 const sourceObj = {
    
    beginDrag(props) {
        if(props.type === "link"){
            const {link} = props.star
            const type = props.type
            return ({
                link, type //this gets sent to the drop item // is null in this example because react-dnd is overkill
            });
        } else {
            const childId = props.link.id
            const type = props.type
            return ({
                childId, type //this gets sent to the drop item // is null in this example because react-dnd is overkill
            });
        }
    },

    endDrag(props, monitor) {// this takes props mounted on beginDrag
        if(!monitor.didDrop()){
            return ;
        }
        // let note = {}
        if(props.type === "link"){
            // let note = props.star
            const link = props.star.message;
            let addSlackLink = {
                slack_text: link.text,
                slack_type: link.type,
                slack_user: link.user,
                URL: link.permalink,
                API: 'slack',
                isLink: true,
            }
            const selfType = props.type
            const parentId = monitor.getDropResult();
            props.onDrop(addSlackLink, selfType, parentId.targetId);
        } else {
            const childId = props.link.id
            console.log(childId)
            // const selfType = props.type
            const parent = monitor.getDropResult();
            console.log(parent)
            props.onDrop(childId, parent.type, parent.targetId)   
        }
    },
  };

  const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    // didDrop: monitor.didDrop(),
  });

export default DragSource('item', sourceObj, collect)(SlackNote);

const SlackNoteDiv = styled.div`
    ${apiNote()}
    background: #FFD700;
    .slack-note-top{
        border: 1px solid green;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        overflow: hidden;
        margin-bottom: 2px;
    }
    .slack-note-middle{
        border: 1px solid blue;
        width: 100%;
        box-sizing: border-box;
    }
    .slack-time{
        margin: 0;
    }
    .slack-note-bottom{
        border: 1px solid red;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`;
