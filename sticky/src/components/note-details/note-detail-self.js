import React from 'react';
import { DropTarget } from 'react-dnd';
// import { NoteDetails } from '../index.js';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { bg, start } from '../../styles/styl-utils.js'
import { NoteDetailChild, NoteDetailSettings }from '../index.js';
import ReactMarkdown from 'react-markdown';

const NoteDetailSelf = (props) => (
  props.connectDropTarget(
    <div className="NoteDetailSelf">
        {(props.note) ?
          (
            <NoteDetailSelfDiv color={props.note.note_color}>
            <div className="note-detail" style={{background: props.hover ? 'lightgreen' : null}}>
            
            <div className="note-detail-main">

              <div className="note-detail-left">
                <div className="note-detail-body">
                  {<ReactMarkdown>{props.note.textBody}</ReactMarkdown>}
                  
                </div>

                <div className="note-detail-children">
                {props.allNotes.map( layerOne => {
                    if(layerOne.parent_id === props.note.id){
                        return (
                        <NoteDetailChild
                            type="note"
                            onDrop={props.onDrop}
                            changeParent={props.changeParent}
                            key={layerOne.id}
                            layerOne={layerOne}
                            allNotes={props.allNotes}
                            color={layerOne.note_color}
                        />)
                    } else {
                        return null
                        }
                    })}
                </div>
              </div>
              <div className="note-detail-right">
                  <h5>media links</h5>
                  <iframe title='test' className="note-detail-media" src="https://www.youtube.com/embed/lJIrF4YjHfQ" frameBorder="0" allow="autoplay; encrypted-media" allowFullscreen></iframe>
                  <div className="note-detail-media">Media 1</div>
                  <div className="note-detail-media">Media 2</div>
                  <div className="note-detail-media">Media 3</div>
                  <div className="note-detail-media">Media 4</div>
              </div>
            </div>
            <div className="note-detail-settings">
              {/* <NoteDetailSettings id={props.note.id} editNote={props.editNote} /> */}
              <Link
                  className="link"
                  onClick={() => props.enableDelete()}
                  to={`/note/${props.note.id}/delete`}
                >delete</Link>
                <Link
                  className="link"
                  to={`/note/${props.note.id}/edit`}
                >edit</Link>
              <i className="fas fa-cogs"></i>
            </div>
            </div>

          </NoteDetailSelfDiv>
        ) :
        null}
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
    const hover = monitor.isOver({shallow: false})
    
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

export default DropTarget('item', targetObj, collect)(NoteDetailSelf);


const NoteDetailSelfDiv = styled.div`
  ${start('red')}
  justify-content: center;
  height: 100%;
  width: 100%;
  .note-detail {
    ${start('black')}
    background-color: ${props => props.color};
    ${'' /* above is for custom colors. below is a placeholder until I can figure out how to make them look good and custom */}
    background-color: lightgray;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 5px;
    height: 100%;
    .note-detail-settings{
      ${start('blue')}
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      .link, i{
        margin: 0 10px;
        text-decoration: none;
        color: black;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    .note-detail-main{
      ${start('green')}
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      height: 100%;
      .note-detail-left{
        ${start('white')}
        width: 80%;
        margin: 5px;
        height: 99%;
        flex-direction: column;
        align-items: space-between;
        justify-content: space-between;
        .note-detail-body{
          ${start('blue')}
          height: 50%;
          h4 {
            font-weight: bold;
            margin-bottom: 10px;
            text-decoration: underline;
          }
          p {
            line-height: 30px;
          }
        }
        .note-detail-children{
          ${start('purple')}
          flex-direction: row;
          justify-content: safe space-around;
          overflow: auto;
          height: 50%;
          .note-detail-child-container{
               ${'' /* this class is on the next page */}
               ${start('blue')}
               ${'' /* background: black; */}
               min-width: 24%;
               margin: 0 3px;
          }
        }
      }
      .note-detail-right{
        ${start('red')}
        flex-direction: column;
        width: 20%;
        margin: 5px;
        overflow: auto;
        height: 99%;
        .note-detail-media{
          border: 1px solid green;
          height: 100px;
          width: 95%;
          overflow: hidden;   
        }
      } 
    }
  }
`;

// these do nothing
// .note-detail-child{
//             ${start('red')}
//             margin: 3px;
//             flex-direction: row;
//             width: 40%;
//            
//           }