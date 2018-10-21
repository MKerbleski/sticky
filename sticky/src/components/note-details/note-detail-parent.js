import React from 'react';
import { DropTarget } from 'react-dnd';
import { NoteDetailSelf } from '../index.js';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { flex, start } from '../../styles/styl-utils.js'

const NoteDetailParent = (props) => (
    props.connectDropTarget(
    <div>
        <NoteDetailParentDiv color={props.parentColor} style={{background: props.hover ? 'lightgreen' : null}}>
            <div className="links">
              <div className="left-side-links">
                <Link
                  className="link"
                  to={props.note.parent_id ? `/note/${props.note.parent_id}/` : `/all-notes/`}
                >back to parent note</Link>
              </div>
              <div className="right-side-links">
                <Link
                  className="link"
                  onClick={() => props.enableDelete()}
                  to={`/note/${props.note.id}/delete`}
                >delete</Link>
                <Link
                  className="link"
                  to={`/note/${props.note.id}/edit`}
                >edit</Link>
                <Link
                  className="link"
                  to={`/all-notes/`}
                >all notes</Link>
              </div>
            </div>
            <NoteDetailSelf
                
                enableDelete={props.enableDelete} 
                allNotes={props.allNotes}
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
        console.log('target props', props, hover)
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
    padding: 25px;
    ${'' /* background-color: white; */}
    ${'' /* background-color: #F3F3F3; */}
    box-sizing: border-box;
    height: 95vh;
    overflow: auto;
    .NoteDetailSelf{
        ${'' /* THIS IS ON NEXT PAGE */}
        ${start('green')}
        height: 100%;
        background: black;
        width: 90%;
    }
    .links {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        text-align: right;
        .left-side-links{
        ${'' /* border: 1px solid red; */}
        width: 100%;
        ${flex()}
        }
        ${'' /* border: 1px solid blue; */}
        .link {
        ${'' /* border: 1px solid red; */}
        margin: 8px;
        color: gray;
        ${'' /* font-weight: bold */}
        }
    }
`;