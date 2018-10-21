import React from 'react';
import { DropTarget } from 'react-dnd';
import NotePreview from './note-preview.js';
import styled from 'styled-components';

const NoteDetailParent = (props) => (
  props.connectDropTarget(
    <ReactFragment>
        <NoteDetailParentDiv>

        </NoteDetailParentDiv>
    </ReactFragment>
  )
);

const targetObj = {
  hover(props, component){
      if(props.hoverShallow){
          console.log('hoverShallow')
      }
  },

  drop(props, monitor) {
    const hover = monitor.isOver({shallow:false})
    
    if(hover){
        console.log('target props', props, hover)
        const { type } = props;
        return ({
            type,
        });
    }
  }
}

const collect = (connect,  monitor) => ({
  connectDropTarget: connect.dropTarget(),
  highlighted: monitor.canDrop(),
  hover: monitor.isOver({shallow: true}),
  hoverFalse: monitor.isOver()
});

export default DropTarget('item', targetObj, collect)(NoteDetailParent);

const NoteDetailParentDiv = styled.div`
    background: lightcoral;
`;