import styled from 'styled-components';
import React from 'react';
import {DragSource} from 'react-dnd';
// import ReactMarkdown from 'react-markdown';

const PocketNote = (props) => {
    if(props.pocketItem){
        return (
            props.connectDragSource(
                <div>
                    <PocketNoteDiv 
                        type="pocket" 
                        style={{
                            opacity: props.isDragging ? '0.25' : '1',
                            border: props.isDragging ? '1px dashed gray': '1px solid black'}}
                    >
                        <div className="pocket-note-text">
                            <p>{props.pocketItem.given_title}</p>
                        </div> 

                        <div className="pocket-note-link">
                            <a target="_blank" href={props.pocketItem.given_url}>Link</a>
                        </div> 
                    </PocketNoteDiv>
                </div>
            )
        )
    } else {
        return null
    }
 }

 const sourceObj = {
    
    beginDrag(props) {
        if(props.type === "pocket"){
            const pocketId = props.pocketItem.item_id
            const type = props.type
            return ({
                pocketId, type //this gets sent to the drop item 
            });
        } 
        else {
            const pocketId = props.pocketItem.item_id
            const type = props.type
            return ({
                pocketId, type //this gets sent to the drop item // is null in this example because react-dnd is overkill
            });
        }
    },
    
    endDrag(props, monitor) {// this takes props mounted on beginDrag
        if(!monitor.didDrop()){
            return ;
        }
        let pocket_item_id = props.pocketItem.pocket_id;
        let sticky_note_attached_pocket_items;
        let sticky_note_id = monitor.getDropResult();
        //need to extract pocket_items_attached off notes
        sticky_note_id = sticky_note_id.targetId
        console.log("end Drag pocket, attached_to", sticky_note_attached_pocket_items, "sticky_note_id", sticky_note_id)
        let newAttached;
        if(sticky_note_attached_pocket_items === null){   
            newAttached = [pocket_item_id]
        } else {
            newAttached = sticky_note_attached_pocket_items.push(pocket_item_id)
        }
        console.log(newAttached, "new_attached", "sticky_note_id", sticky_note_id)
        props.attachPocketItem(newAttached, sticky_note_id)
    },
  };

  const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    // didDrop: monitor.didDrop(),
  });

export default DragSource('item', sourceObj, collect)(PocketNote);

const PocketNoteDiv = styled.div`
    border: 1px solid green;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 3px;
    color: black;
    margin-left: 28px ;
    background: lightpink;
    .pocket-note-text{
        ${'' /* border: 1px solid green; */}
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        overflow: hidden;
        margin-bottom: 2px;
    }
    .pocket-note-link{
        ${'' /* border: 1px solid red; */}
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;

    }
`;
