import styled from 'styled-components';
import React from 'react';
import { DragSource } from 'react-dnd';
// import ReactMarkdown from 'react-markdown';

const PocketNote = (props) => {
    if(props.pocketItem){
        // console.log(props)        
        return (
            props.connectDragSource(
                <div>
                    <PocketNoteDiv 
                        type="pocket" 
                        style={{
                            opacity: props.isDragging ? '0.25' : '1',
                            border: props.isDragging ? '1px dashed gray': '1px solid black'}}>
                        {/* flag for whether or not it is attached to a note */}
                        <div className="pocket-note-text">
                            {props.pocketItem.given_title === "" ? <p>{props.pocketItem.resolved_title}</p> : <p>{props.pocketItem.given_title}</p>}
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
        // IF TYPE == TRASH THAN DELETE ATTACHMENT
        // console.log(props.pocketItem)
        let pocket_item_id = props.pocketItem.id;
        let target_info = monitor.getDropResult();
        // console.log(target_info)
        //need to extract pocket_items_attached off notes
        let sticky_note_id = target_info.targetId
        let attached_pocket_items = target_info.pocket_items_attached
        console.log("end Drag pocket, attached_to", attached_pocket_items, "sticky_note_id", sticky_note_id)
        let newAttached;
        
        if(attached_pocket_items === null){   
            newAttached = `${pocket_item_id}`
            //SHOULD ALSO ATTACH HOW MANY ARE ON THE NOTES
            let noteEdit = {pocket_items_attached: newAttached}
            props.attachPocketItem(noteEdit, sticky_note_id)
        } else {
            let tempArr = attached_pocket_items.split(',')
            // console.log(tempArr)
            let repeat = tempArr.filter(note => {
                // console.log("inside filter", +note, pocket_item_id)
                return +note === pocket_item_id
            })
            // console.log(repeat)
            if(repeat.length > 0){
                //do nothing
                console.log("REPEAT no action taken, alert needed")
                window.alert("item is already attached. No duplicate notes")
            } else {
                newAttached = attached_pocket_items + `,${pocket_item_id}`
                // console.log(newAttached, "new_attached", "sticky_note_id", sticky_note_id)
                //SHOULD ALSO ATTACH HOW MANY ARE ON THE NOTES
                let noteEdit = {pocket_items_attached: newAttached}
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
