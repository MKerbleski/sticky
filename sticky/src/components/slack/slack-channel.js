import styled from 'styled-components';
import React from 'react';
import {DragSource} from 'react-dnd';
import ReactMarkdown from 'react-markdown';
import { SlackNote }from '../index.js'

const SlackChannel = (props) => {
    if (props){
        console.log(props)
        //probably need an up pin unstar button
        return (
            <SlackChannelDiv 
                innerRef={instance => props.connectDragSource(instance)}
                type="channel" 
                style={{
                    opacity: props.isDragging ? '0.25' : '1',
                    border: props.isDragging ? '1px dashed gray': '1px solid black'}}>
                <h3 className="slack-channel-title">#{props.channel.name}</h3>
                {props.channel.notes.map(note => {
                    return <SlackNote key={note.uuid} note={note} />
                })}
            </SlackChannelDiv>
        )
    } else {
        return null
    }
 }

 const sourceObj = {
    beginDrag(props) {
        // if(props.type === "link"){
        //     const {link} = props.star
        //     const type = props.type
        //     return ({
        //         link, type //this gets sent to the drop item // is null in this example because react-dnd is overkill
        //     });
        // } else {
        //     const channel_id = props.link.id
        //     const type = props.type
        //     return ({
        //         childId, type //this gets sent to the drop item // is null in this example because react-dnd is overkill
        //     });
        // }
        return props.channel.name
    },

    endDrag(props, monitor) {// this takes props mounted on beginDrag
        if(!monitor.didDrop()){
            return ;
        }
        // let note = {}
        if(props.type === "link"){
            // let note = props.star
            // const link = props.star.message;
            // let addSlackLink = {
            //     slack_text: link.text,
            //     slack_type: link.type,
            //     slack_user: link.user,
            //     URL: link.permalink,
            //     API: 'slack',
            //     isLink: true,
            // }
            // const selfType = props.type
            // const parentId = monitor.getDropResult();
            // props.onDrop(addSlackLink, selfType, parentId.targetId);
        } else {
            // const childId = props.link.id
            // console.log(childId)
            // // const selfType = props.type
            // const parent = monitor.getDropResult();
            // console.log(parent)
            // props.onDrop(childId, parent.type, parent.targetId)   
        }
        return
    },
  };

  const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    // didDrop: monitor.didDrop(),
  });

export default DragSource('item', sourceObj, collect)(SlackChannel);

const SlackChannelDiv = styled.div`
    border: 13px solid green;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 3px;
    margin: 3px;
    color: black;
    background: white;
    .slack-channel-title{
        border: 1px solid green;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        overflow: hidden;
        margin-bottom: 2px;
        margin-top: 0;
        padding: 2px;
    }
`;
