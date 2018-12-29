import styled from 'styled-components';
import React from 'react';
import { DragSource } from 'react-dnd';
import ReactMarkdown from 'react-markdown';
import { apiNote } from '../../styles/styl-utils'
import format from 'date-fns/format'
import { attachPocketItem } from '../../actions'
import { connect } from 'react-redux';

const SlackNote = (props) => {
    let time = props.slackItem.ts.slice(0, 10)*1000
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
                    <strong>{props.slackItem.slack_user_name}</strong>
                    <div className="status">
                        <span>{props.slackItem.is_pinned ? "pin" : null}</span>
                        <span>{props.slackItem.is_starred ? "star" : null}</span>
                    </div>
                </div> 
                <div className="slack-note-middle">
                    <ReactMarkdown className="slack-text">{props.slackItem.type === "message" ? props.slackItem.text : "error at note text"}</ReactMarkdown>
                </div> 
                <span className="slack-note-bottom">
                    <p className="slack-time">{time}</p>
                    <a target="_blank" href={props.slackItem.permalink}>Link to Slack</a>
                </span>
            </SlackNoteDiv>
        )
    } else {
        return null
    }
 }

 const sourceObj = {
    
    beginDrag(props) {
        const slack_note_id = props.slackItem.id;
        const type = "slack"
        return ({ slack_note_id, type })
    },

    endDrag(props, monitor) {// this takes props mounted on beginDrag
        if(!monitor.didDrop()){
            return;
        }
        const slack_item_id = props.slackItem.id;
        const target_info = monitor.getDropResult();
        if(target_info.type === "deleteBin"){
            let stickyNote = props.stickyNote;
            let tempArr = props.store.notes.attachedItems.map(obj => {
                return obj.id
            })
            if(tempArr.length === 1){
                let noteEdit = {slack_items_attached: null}
                props.attachPocketItem(noteEdit, stickyNote.id)
            } else {
                let index = tempArr.indexOf(slack_item_id)
                if(index > -1){
                    tempArr.splice(index, 1)
                }
                let newStr = tempArr.toString()
                let noteEdit = {slack_items_attached: newStr}
                props.attachPocketItem(noteEdit, stickyNote.id) 
            }
        } else if (target_info.type === "note") { 
            const sticky_note_id = target_info.targetId
            let slack_items_attached = target_info.slack_items_attached
            if(slack_items_attached.length === 0){
                let noteEdit = {slack_items_attached: `${slack_item_id}`}
                props.attachPocketItem(noteEdit, sticky_note_id)
            } else {
                let tempArr = slack_items_attached.map(obj => {
                    return obj.id
                })
                let repeat = tempArr.filter(note => {
                    return +note === slack_item_id
                })
                if(repeat.length > 0){
                    //do nothing
                    console.log("REPEAT no action taken, alert needed")
                    window.alert("Item is already attached to this note. No duplicate notes")
                } else {
                    let newAttached = tempArr + `,${slack_item_id}`
                    let noteEdit = {slack_items_attached: newAttached}
                    props.attachPocketItem(noteEdit, sticky_note_id)
                }
            }
        }
    },
  };

  const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    // didDrop: monitor.didDrop(),
  });

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    attachPocketItem
}

export default connect(mapStateToProps, mapDispatchToProps)(DragSource('item', sourceObj, collect)(SlackNote))

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
