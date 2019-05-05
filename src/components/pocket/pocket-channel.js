import styled from 'styled-components';
import React from 'react';
import { DragSource } from 'react-dnd';

import { 
    PocketNote 
} from '../index.js'

import { 
    apiChannel 
} from '../../styles/styl-utils'

const PocketChannel = (props) => {
    if (props){
        // eventually need an unpin/unstar button
        return (
            <PocketChannelDiv 
                innerRef={instance => props.connectDragSource(instance)}
                type="channel" 
                style={{
                    opacity: props.isDragging ? '0.25' : '1',
                    border: props.isDragging ? '1px dashed gray': '1px solid black'}}>
                <h3 className="pocket-channel-title">All Pocket Notes</h3>
                {props.pocketList.map(pocketItem => {
                    return (
                        <PocketNote 
                            parent={null}
                            type="pocket" 
                            editAttachedItems={props.editAttachedItems} 
                            key={pocketItem.item_id} 
                            item={pocketItem} 
                        />
                    )
                })}
                {props.pocketList && props.pocketList.length === 0 
                    ?   <div>
                            <h5>Empty pocket list</h5>
                            <p>either</p>
                            <button>Sync</button>
                            <p>or add items to your pocket List</p>
                        </div>
                    :   null} 
            </PocketChannelDiv>
        )
    } else {
        return null
    }
 }

 const sourceObj = {
     // NOT IMMEDITALLY SURE WHAT THIS IS DOING TO WHY IT WAS COMMENTED OUT
     // TODO - THIS SHOULD NOT BE A DRAGGABLE OBJECT
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

export default DragSource('item', sourceObj, collect)(PocketChannel);

const PocketChannelDiv = styled.div`
    ${apiChannel()}
    .pocket-channel-title{
        /* border: 1px solid green; */
        box-sizing: border-box;
        width: 100%;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        overflow: hidden;
        margin-bottom: 2px;
        margin-top: 0;
        padding: 2px;
    }
`;
