import styled from 'styled-components';
import React from 'react';
import { DragSource } from 'react-dnd';
import { sharedStickyNoteDrop } from '../../helpers'
import { noteToNote } from '../../actions'
import { connect } from 'react-redux'

const NotePreviewGrandChild = (props) => {
    const goToNote = (e) => {
        props.redirect(`/${props.note.sticky_username}/note/${props.note.id}`)
    }

    if (props.note){
        return (
            props.connectDragSource(
                <div 
                    onClick={(e) => {e.stopPropagation();}}
                > 
                    <NotePreviewGrandChildDiv  
                        onClick={goToNote} 
                        type="note" 
                        style={{
                            opacity: props.isDragging ? '0.25' : '1',
                            border: props.isDragging ? '1px dashed gray': '1px solid black',
                            //  color: props.didDrop ? "red" : "green"
                        }}
                    >
                       <p>{props.note.text_body}</p>
                    </NotePreviewGrandChildDiv>
                </div>
            )
        )
    } else {
        return null
    }
 }

 const sourceObj = {
    beginDrag(props) {
        const note = props.note;
        const parent = props.parent
        return ({
            type: 'note',
            parent: parent,
            note: note,
        });
    },

    endDrag(props, monitor) {
        if(!monitor.didDrop()){
            return ;
        }

        const note = props.note;
        const parent = props.parent
        const source = {
            type: 'note',
            parent: parent,
            note: note,
        }

        let noteEdit = sharedStickyNoteDrop(source, monitor);
        if(noteEdit !== null){
			props.noteToNote(noteEdit)
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
    noteToNote,
}
  
export default connect(
    mapStateToProps, mapDispatchToProps)(
        DragSource('item', sourceObj, collect)(NotePreviewGrandChild))

const NotePreviewGrandChildDiv = styled.div`
    border: 1px solid green;
    background: black;
    color: white;
    font-size: 10px;
    height: 20px;
    width: 20px;
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
