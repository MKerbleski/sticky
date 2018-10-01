import React from 'react';
import { DropTarget } from 'react-dnd';
import NotePreview from './note-preview.js';

const AllNotesBin = (props) => (
  props.connectDropTarget(
    <div className="all-notes">
        {props.allNotes.map( layerOne => {
        if(layerOne.parent_id === null){
            return (
            <NotePreview
                type="note"
                onDrop={props.onDrop}
                changeParent={props.changeParent}
                key={layerOne.id}
                layerOne={layerOne}
                allNotes={props.allNotes}
            />)
        } else {
            return null
        }
        })}
    </div>
  )
);

const targetObj = {
  hover(props, component){

      if(props.hoverShallow){
          console.log('hoverShallow')
      }
   
  },

  drop(props, monitor) {
      const hover = monitor.isOver({shallow:true})
    console.log('target props', props, hover)
    const { type } = props;
    return ({
      type,
    });
  }
}

const collect = (connect,  monitor) => ({
  connectDropTarget: connect.dropTarget(),
  highlighted: monitor.canDrop(),
  hover: monitor.isOver({shallow: true}),
  hoverFalse: monitor.isOver()
});

export default DropTarget('item', targetObj, collect)(AllNotesBin);