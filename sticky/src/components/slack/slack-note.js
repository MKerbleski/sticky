import styled from 'styled-components';
import React from 'react';
import { DragSource } from 'react-dnd';
import ReactMarkdown from 'react-markdown';
import { apiNote } from '../../styles/styl-utils'
import format from 'date-fns/format'
import { editAttachedItems } from '../../actions'
import { connect } from 'react-redux';
import { sharedEndDrag } from '../../helpers/api-end-drag'

const SlackNote = (props) => {
    let time = props.item.ts.slice(0, 10)*1000
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
                    <strong>{props.item.slack_user_name}</strong>
                    <div className="status">
                        <span>{props.item.is_pinned ? "pin" : null}</span>
                        <span>{props.item.is_starred ? "star" : null}</span>
                    </div>
                </div> 
                <div className="slack-note-middle">
                    <ReactMarkdown className="slack-text">{props.item.type === "message" ? props.item.text : "error at note text"}</ReactMarkdown>
                </div> 
                <span className="slack-note-bottom">
                    <p className="slack-time">{time}</p>
                    <a target="_blank" href={props.item.permalink}>Link to Slack</a>
                </span>
            </SlackNoteDiv>
        )
    } else {
        return null
    }
 }

 const sourceObj = {
    
    beginDrag(props) {
        const slack_note_id = props.item.id;
        const type = "slack"
        return ({ slack_note_id, type })
    },

    endDrag(props, monitor) {// this takes props mounted on beginDrag
        sharedEndDrag(props, monitor, 'slack_items_attached');
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
    editAttachedItems
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
