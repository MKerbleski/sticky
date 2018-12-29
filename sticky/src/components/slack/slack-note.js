import styled from 'styled-components';
import React from 'react';
import { DragSource } from 'react-dnd';
import ReactMarkdown from 'react-markdown';
import { apiNote } from '../../styles/styl-utils'
import format from 'date-fns/format'


const SlackNote = (props) => {
    let note
    if(props.type === "link"){
        note = props.note
    } else {
        note = props.note
    }
    let time = note.ts.slice(0, 10)*1000
    time = format(time, 'MMM Do YYYY')
    if (props){
        return (
            <SlackNoteDiv 
                innerRef={instance => props.connectDragSource(instance)}
                type="slack"
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
                    <ReactMarkdown className="slack-text">{note.type === "message" ? note.text : "error at note text"}</ReactMarkdown>
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
        const slack_note_id = props.note.id;
        const type = "slack"
        return ({ slack_note_id, type })
    },

    endDrag(props, monitor) {// this takes props mounted on beginDrag
        if(!monitor.didDrop()){
            return ;
        }
        const slack_item_id = props.note.id;
        const target_info = monitor.getDropResult();
        const sticky_note_id = target_info.targetId
        let attached_slack_items = target_info.slack_items_attached
        if(!attached_slack_items){
            //SHOULD ALSO ATTACH HOW MANY ARE ON THE NOTES
            let noteEdit = {slack_items_attached: `${slack_item_id}`}
            props.attachPocketItem(noteEdit, sticky_note_id)
        } else {
            let tempArr = attached_slack_items.split(',')
            let repeat = tempArr.filter(note => {
                return +note === slack_item_id
            })
            let newAttached;
            if(repeat.length > 0){
                //do nothing
                //NEED CHECK FOR IF DROPS ON SELF
                console.log("REPEAT no action taken, alert needed")
                window.alert("item is already attached. No duplicate notes")
            } else {
                newAttached = attached_slack_items + `,${slack_item_id}`
                //SHOULD ALSO ATTACH HOW MANY ARE ON THE NOTES
                let noteEdit = {slack_items_attached: newAttached}
                props.attachPocketItem(noteEdit, sticky_note_id)
            }
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
        overflow: hidden;
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
