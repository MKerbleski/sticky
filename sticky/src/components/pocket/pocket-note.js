import styled from 'styled-components';
import React from 'react';
import { DragSource } from 'react-dnd';
// import ReactMarkdown from 'react-markdown';
import { apiNote } from '../../styles/styl-utils'
import { sharedEndDrag } from '../../helpers/api-end-drag'
import { editAttachedItems } from '../../actions'
import { connect } from 'react-redux';

const PocketNote = (props) => {
    if(props.item){
        return (
            <PocketNoteDiv 
                innerRef={instance => props.connectDragSource(instance)}
                type="pocket" 
                style={{
                    opacity: props.isDragging ? '0.25' : '1',
                    border: props.isDragging ? '1px dashed gray': '1px solid black'}}>
                {/* flag for whether or not it is attached to a note */}
                <div className="pocket-note-text">
                    {props.item.given_title === "" ? <p>{props.item.resolved_title}</p> : <p>{props.item.given_title}</p>}
                </div> 

                <div className="pocket-note-link">
                    <a target="_blank" href={props.item.given_url}>Link</a>
                </div> 
            </PocketNoteDiv>
        )
    } else {
        return null
    }
 }

 const sourceObj = {
    
    beginDrag(props) {
        if(props.type === "pocket"){
            const pocketId = props.item.item_id
            const type = props.type
            return ({
                pocketId, type //this gets sent to the drop item 
            });
        } 
        else {
            const pocketId = props.item.item_id
            const type = props.type
            return ({
                pocketId, type //this gets sent to the drop item // is null in this example because react-dnd is overkill
            });
        }
    },
    
    endDrag(props, monitor) {// this takes props mounted on beginDrags
        let obj = sharedEndDrag(props, monitor, 'pocket_items_attached');
        console.log(obj)
        //noteEdit is the modified note
        props.editAttachedItems(obj)
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

export default connect(mapStateToProps, mapDispatchToProps)(DragSource('item', sourceObj, collect)(PocketNote));

const PocketNoteDiv = styled.div`
    ${apiNote()}
    background: lightpink;
    .pocket-note-text{
         border: 1px solid green;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        overflow: hidden;
        margin-bottom: 2px;
    }
    .pocket-note-link{
        border: 1px solid red;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;

    }
`;
