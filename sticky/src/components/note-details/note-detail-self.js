import React from 'react';
import { DropTarget } from 'react-dnd';
// import { NoteDetails } from '../index.js';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { start } from '../../styles/styl-utils.js'
import { NoteDetailChild }from '../index.js';
import ReactMarkdown from 'react-markdown';

import LinkSource from './linkSource.js';

const NoteDetailSelf = (props) => (
  props.connectDropTarget(
    <div className="note-detail-self-container">{/* THIS IS ON PREVIOUS COMPONENT */}
        {(props.note) ?
          (<NoteDetailSelfDiv 
                color={props.note.note_color}
                className="note-detail" 
                style={{background: props.hover ? 'lightgreen' : null}}
            >
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
                        }{/* if */}
                    })}{/* map */}
                  </div>{/* noted-detail-children */}
                </div>{/* note-detail-left */}
                <div className="note-detail-right">
                    {props.allLinks ? 
                        <React.Fragment>
                          <h5>media links</h5>
                          {props.allLinks.map(link => {
                            if (link.parent_id == props.note.id){
                                return (
                                  <div  
                                    key={link.id} 
                                    className="link-source-container">
                                      <LinkSource 
                                          link={link} 
                                          type='note'
                                          onDrop={props.onDrop}>
                                          text: {link.slack_text}
                                      </LinkSource>
                                  </div>)
                            }{/* if */}
                          })}{/* map */}
                        </React.Fragment>
                    : <p>no links associated with this note</p>}
                </div>{/* note-detail-right */}
              </div>{/* note-detail-main */}

              <div className="note-detail-settings">
                <Link
                    className="settings-link"
                    onClick={() => props.enableDelete()}
                    to={`/note/${props.note.id}/delete`}
                >delete</Link>
                <Link
                  className="settings-link"
                  to={`/note/${props.note.id}/edit`}
                >edit</Link>
                <i className="fas fa-cogs"></i>
              </div>{/* note-detail-settings */}
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
  background-color: ${props => props.color};
  ${'' /* above is for custom colors. below is a placeholder until I can figure out how to make them look good and custom */}
  background-color: lightgray;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px;
  .note-detail-main{
    ${start('green')}
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    .note-detail-left{
      ${start('white')}
      width: 70%;
      margin: 5px;
      height: 99%;
      flex-direction: column;
      align-items: space-between;
      justify-content: space-between;
      .note-detail-body{
        ${start('blue')}
        height: 50%;
        overflow: hidden;
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
      background: lightblue;
      width: 30%;
      margin: 5px;
      overflow: auto;
      height: 99%;
      .link-source-container{
        border: 1px solid green;
        ${'' /* height: 100px; */}
        margin-bottom: 2px;
        width: 99%;
        overflow: hidden;   
      }
    } 
  }
  .note-detail-settings{
    ${start('blue')}
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    .settings-link, i{
      margin: 0 10px;
      text-decoration: none;
      color: black;
      &:hover{
        text-decoration: underline;
      }
    }
  }
`;