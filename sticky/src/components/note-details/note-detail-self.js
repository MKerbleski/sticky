import React from 'react';
import { DropTarget } from 'react-dnd';
// import { NoteDetails } from '../index.js';
import styled from 'styled-components';
// import {Link} from 'react-router-dom';
// import { flex } from '../../styles/styl-utils.js'
import { NoteDetailChild }from '../index.js';
import ReactMarkdown from 'react-markdown';

const NoteDetailSelf = (props) => (
  props.connectDropTarget(
    <div>
        {(props.note) ?
          (
            <NoteDetailSelfDiv style={{background: props.hover ? 'lightgreen' : null}}>
            
            
            <div className="note-detail">
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
                            className="note-detail-child"
                        />)
                    } else {
                        return null
                        }
                    })}
                  <div className="note-detail-child">Child 1</div>
                  <div className="note-detail-child">Child 2</div>
                  <div className="note-detail-child">Child 3</div>
                  <div className="note-detail-child">Child 4</div>
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
    const hover = monitor.isOver({shallow:false})
    
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
  display: flex;
  justify-content: center;
  .note-detail {
    background-color: white;
    border: 1px solid lightgray;
    width: 85%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    color: black;
    padding: 10px;
    height: 100%;
    .note-detail-left{
      border: 1px solid green;
      width: 80%;
      margin: 5px;
      padding: 1px;
      height: 95%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .note-detail-body{
        border: 1px solid blue;
        h4 {
          font-weight: bold;
          margin-bottom: 10px;
          text-decoration: underline;
        }
        p {
          line-height: 30px;
        }
        .tags{
          ${'' /* border: 1px solid lightgray; */}
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          div{
            margin: 3px;
            padding: 5px;
          }
          .tag {
            border: 1px solid lightgray;
          }
        }
      }
      .note-detail-children{
        border: 1px solid purple;
        display: flex;
        flex-direction: row;
        overflow: auto;
        .note-detail-child{
          border: 1px solid red;
          margin: 3px;
          display: flex;
          flex-direction: row;
          width: 100px;
        }
      }
    }
    .note-detail-right{
      border: 1px solid red;
      width: 20%;
      margin: 5px;
      overflow: auto;
      height: 95%;
      .note-detail-media{
        border: 1px solid green;
        height: 100px;
        width: 95%;
        overflow: hidden;   
      }
    } 
  }
`;