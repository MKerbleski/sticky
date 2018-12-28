import React from 'react';
import { DropTarget } from 'react-dnd';
import { NoteDetailSelf } from '../index.js';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { start } from '../../styles/styl-utils.js'

const NoteDetailParent = (props) => (
    props.connectDropTarget(
    <div>
        <NoteDetailParentDiv color={props.parentColor} style={{background: props.hover ? 'lightgreen' : null}}>
            <Link
                className="link"
                to={props.note.parent_id ? `/note/${props.note.parent_id}/` : `/all-notes/`}
            >back to parent note</Link>
            <NoteDetailSelf
                allNotes={props.allNotes}
                allLinks={props.allLinks}
                note={props.note} 
                onDrop={props.onDrop} 
                changeParent={props.changeParent}
                targetId={props.note.id}
                editNote={props.editNote}
                type="note"
            />
        </NoteDetailParentDiv>
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
    
    if(hover){
        // console.log('target props', props, hover)
        const { type, targetId } = props;
        return ({
            type, targetId
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
    background-color: ${props => props.color};
    ${'' /* above is for custom colors. below is a placeholder until I can figure out how to make them look good and custom */}
    background-color: white;
    border: 1px solid green;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    height: 94vh;
    overflow: auto;
    .link {
        ${'' /* border: 1px solid red; */}
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 15px;
        margin: 8px;
        color: gray;
        width: 100%;
    }
`;