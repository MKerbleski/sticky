import styled from 'styled-components';
import React from 'react';
import { DragSource } from 'react-dnd';
import ReactMarkdown from 'react-markdown';
import { apiNote } from '../../styles/styl-utils'


const SlackNote = (props) => {
    let note
    if(props.type === "link"){
        note = props.note
    } else {
        note = props.note
    }
    if (props){
        console.log(note)
        return (
            <SlackNoteDiv 
                innerRef={instance => props.connectDragSource(instance)}
                type="link"
                style={{
                    opacity: props.isDragging ? '0.25' : '1',
                    border: props.isDragging ? '1px dashed gray': '1px solid black'}}>
                <div className="slack-note-text">
                <ReactMarkdown>
                    {note.type === "message" ? 
                        note.text : 
                        "error at note text"
                    }
                </ReactMarkdown>
                </div> 
                <div className="slack-note-link">
                    {note.message ?
                            <a target="_blank" 
                            href={note.message.permalink}>
                            go to Slack
                            </a> :
                            <a target="_blank" href={note.URL}>
                                go to Slack
                            </a>
                    }
                </div> 
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
    background: #FFFFE5;
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
