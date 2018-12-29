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
        // if(props.type === "slack"){
        //     const {link} = props.star
        //     const type = props.type
        //     return ({
        //         link, type //this gets sent to the drop item // is null in this example because react-dnd is overkill
        //     });
        // } else {
        //     const childId = props.link.id
        //     const type = props.type
        //     return ({
        //         childId, type //this gets sent to the drop item // is null in this example because react-dnd is overkill
        //     });
        // }
    },

    endDrag(props, monitor) {// this takes props mounted on beginDrag
        if(!monitor.didDrop()){
            return;
        }
        const slack_item_id = props.slackItem.id;
        const target_info = monitor.getDropResult();
        console.log(target_info)
        if(target_info.type === "deleteBin"){
            let stickyNote = props.stickyNote;
            console.log("deleteBin", stickyNote.id, stickyNote.slack_items_attached.length)
            console.log(props)
                let tempArr = props.store.notes.attachedItems.map(obj => {
                    return obj.id
                })
                console.log("previous" ,tempArr)
                if(tempArr.length === 1){
                    console.log("one")
                    let noteEdit = {slack_items_attached: null}
                    props.attachPocketItem(noteEdit, stickyNote.id)
                } else {
                    let index = tempArr.indexOf(slack_item_id)
                    console.log(slack_item_id, index)
                    if(index > -1){
                        tempArr.splice(index, 1)
                    }
                    console.log("new",tempArr)
                    let newStr = tempArr.toString()
                    let noteEdit = {slack_items_attached: newStr}
                    console.log(noteEdit)
                    props.attachPocketItem(noteEdit, stickyNote.id) 
                }
            

        } else if (target_info.type === "note") { //not trash can
            const sticky_note_id = target_info.targetId
            let slack_items_attached = target_info.slack_items_attached
            console.log("previous", slack_items_attached)
            if(slack_items_attached.length === 0){
                //SHOULD ALSO ATTACH HOW MANY ARE ON THE NOTES
                let noteEdit = {slack_items_attached: `${slack_item_id}`}
                props.attachPocketItem(noteEdit, sticky_note_id)
            } else {
                // let tempArr = slack_items_attached
                let tempArr = slack_items_attached.map(obj => {
                    return obj.id
                })
                console.log(tempArr)
                // tempArr = slack_items_attached.split(',')
                let repeat = tempArr.filter(note => {
                    return +note === slack_item_id
                })
                let newAttached;
                if(repeat.length > 0){
                    //do nothing
                    console.log("REPEAT no action taken, alert needed")
                    window.alert("Item is already attached to this note. No duplicate notes")
                } else {
                    newAttached = tempArr + `,${slack_item_id}`
                    //SHOULD ALSO ATTACH HOW MANY ARE ON THE NOTES
                    let noteEdit = {slack_items_attached: newAttached}
                    console.log("noteEdit", noteEdit)
                    props.attachPocketItem(noteEdit, sticky_note_id)
                }
            }
        }
        
        // if(targetInfo.slack_items_attached)
        // if(props.type === "link"){
        //     // let note = props.star
        //     const link = props.star.message;
        //     let addSlackLink = {
        //         slack_text: link.text,
        //         slack_type: link.type,
        //         slack_user: link.user,
        //         URL: link.permalink,
        //         API: 'slack',
        //         isLink: true,
        //     }
        //     const selfType = props.type
        //     props.onDrop(addSlackLink, selfType, parentId.targetId);
        // } else {
        //     const childId = props.link.id
        //     console.log(childId)
        //     // const selfType = props.type
        //     const parent = monitor.getDropResult();
        //     console.log(parent)
        //     props.onDrop(childId, parent.type, parent.targetId)   
        // }
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
