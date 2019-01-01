import styled from 'styled-components';
import React from 'react';
import { DragSource } from 'react-dnd';
import { sharedStickyNoteDrop } from '../../helpers'
import { editNote } from '../../actions'
import { connect } from 'react-redux'

const LayerThreeSource = (props) => {
    const goToNote = () => {
        props.redirect(`/note/${props.layerThree.id}`)
    }
    if (props.layerThree){
        return (
            props.connectDragSource(
                <div onClick={(e) => {e.stopPropagation();}}> 
                    <LayerThreeDiv  onClick={goToNote} type="note" style={{
                         opacity: props.isDragging ? '0.25' : '1',
                         border: props.isDragging ? '1px dashed gray': '1px solid black',
                        //  color: props.didDrop ? "red" : "green"
                        }}>
                       <p>...</p>
                       {/* <p>{props.getFirstWord(props.layerThree.text_body,1)}</p> */}
                    </LayerThreeDiv>
                </div>
            )
        )
    } else {
        return (null)
    }
 }

 const sourceObj = {
    beginDrag(props) {
        const {childId} = props.layerThree
        const type = props.type
        return ({
            childId, type //this gets sent to the drop item // is null in this example because react-dnd is overkill
        });
    },

    endDrag(props, monitor) {// this takes props mounted on beginDrag
        if(!monitor.didDrop()){
            return ;
        }
        // const childId = props.layerThree.id;
        // const parentId = monitor.getDropResult();
        // props.onDrop(childId, parentId.type, parentId.targetId);

        const sticky_source_id = props.layerThree.id;
        const target = monitor.getDropResult();
        const target_id = target.targetId;
        let noteEdit = sharedStickyNoteDrop(sticky_source_id, target_id, target);
        props.editNote(noteEdit)
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
    editNote,
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(DragSource('item', sourceObj, collect)(LayerThreeSource))

const LayerThreeDiv = styled.div`
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
