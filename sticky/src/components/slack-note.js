import styled from 'styled-components';
import React from 'react';
import {DragSource} from 'react-dnd';

const SlackNote = (props) => {
    let note
    if(props.type === "link"){
        note = props.star
    } else {
        note = props.link
    }
    if (note){
        return (
            props.connectDragSource(
                <div>
                    <SlackNoteDiv type="link" style={{
                            opacity: props.isDragging ? '0.25' : '1',
                            border: props.isDragging ? '1px dashed gray': '1px solid black',
                    }}>
                        <div className="slack-note-text">
                            {note.message ? 
                                note.message.text : 
                                note.slack_text
                            }
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
                </div>
            )
        )
    } else {
        return null
    }
 }

 const sourceObj = {
    
    beginDrag(props) {
        let note
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
        let note
        if(props.type === "link"){
            note = props.star
            const link = props.star.message;
            // console.log('\n --- link', link)
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
        // console.log(props, 'superSubDropProps', monitor)
        
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
    font-size: 13px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 3px;
    color: black;
    margin-left: 28px ;
    background: #FFFAE5;
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
