import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import { flex, start } from '../../styles/styl-utils.js'
import { getAttachedItems } from '../../actions'
import { connect } from 'react-redux';

import LayerTwoTargetSource from "./note-detail-grand-child"

class NoteDetailChild extends React.Component {
  
  getFirstWord = (text, words=2) => {
    let firstWord = text.split(" ").slice(0,words).join(' ');
    if(firstWord.length > 0){
      return firstWord
    } else {
      return text
    }
  }

  getFirstSen = (text) => {
    let firstSen = text
    let firstWord = this.getFirstWord(text)
    firstSen = firstSen.replace(firstWord, '')
    if(firstSen !== firstWord){
      return firstSen
    } else{
      return null
    }
  }
  
  refreshNotes = (id) => {
    this.props.getAttachedItems(id)
  }

  render(props){
      const {
          connectDragSource, 
          connectDropTarget, 
      } = this.props

      if (this.props.layerOne){
          return (
              connectDragSource &&
              connectDropTarget &&
              connectDragSource(
              connectDropTarget(
                  <div className="note-detail-child-container">
                    <NoteDetailChildDiv color={this.props.color} >
                      <Link
                        onClick={() => this.refreshNotes(this.props.layerOne.id)}
                        key={this.props.key}
                        index={this.props.index}
                        className="note-link"
                        id={this.props.layerOne.id}
                        to={`/note/${this.props.layerOne.id}`}
                        style={{background: this.props.hover ? 'lightgreen' : null}}>
                            <div className="noteContent">
                              <h3 className="note-preview-title">{this.getFirstWord(this.props.layerOne.text_body)}</h3>
                              <p>{this.getFirstSen(this.props.layerOne.text_body)}</p> 
                            </div>
                            <div className="layerTwoContainerAll"  >
                              {this.props.allNotes.map(layerTwo => {
                                  if (layerTwo.parent_id === this.props.layerOne.id){return (
                                              <LayerTwoTargetSource  
                                                key={layerTwo.id}
                                                type="note"
                                                onDrop={this.props.onDrop} 
                                                layerTwo={layerTwo} 
                                                allNotes={this.props.allNotes}
                                                getFirstWord={this.getFirstWord} />
                                          )
                                  } else {
                                      return null
                                  }
                              })}
                          </div>                     
                      </Link>
                    </NoteDetailChildDiv>        
                  </div>
            )
            )
        )
      } else {
          return (null)
      }
  }
}


const targetObj = {
  drop(props, monitor) {
      const hover =  monitor.isOver({shallow:true})
      if(hover){//this disables layer one droping if there is a nested child
        const targetId = props.layerOne.id;
        const type = props.type;
        const pocket_items_attached = props.layerOne.pocket_items_attached;
        const slack_items_attached = props.layerOne.slack_items_attached;
        return ({
            targetId, type, pocket_items_attached, slack_items_attached
        });
    }
  },
  hover(props, monitor){
  }
}

const sourceObj = {
  beginDrag(props) {
    const { source_id } = props.layerOne; 
    return ({
      source_id
    });
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }
    const sourceId= props.layerOne.id
    const dropResult = monitor.getDropResult();
    console.log(sourceId,  dropResult, dropResult.targetId)
    props.onDrop( sourceId, dropResult.type, dropResult.targetId  );
  },
};

const mapStateToProps = store => {
  return {store: store};
}

const mapDispatchToProps = {
  getAttachedItems
}

export default connect(mapStateToProps, mapDispatchToProps)(flow(
  DropTarget('item', targetObj, (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      highlighted: monitor.canDrop(),
      hover: monitor.isOver({shallow:true}),
      hoverFalse: monitor.isOver()
  })), 
  
  DragSource('item', sourceObj, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
      isFoobar: true,
  }))

)(NoteDetailChild));

const NoteDetailChildDiv = styled.div`
  ${start('pink')}
  height: 99%;
  width: 100%;
  display: flex;
  flex-direction: column;  
  justify-content: center;
  align-items: center;
  .note-link{
    ${start('red')}
    ${'' /* border: 1px solid green; */}
    ${ flex('column') }
    width: 95%;
    height: 100%;
    padding: 10px;
    align-items: space-around;
    justify-content: flex-start;
    background-color: ${props => props.color};
    ${'' /* above is for custom colors. below is a placeholder until I can figure out how to make them look good and custom */}
    background-color: wheat;
    text-decoration: none;
      .noteContent{
      ${start()}
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      color: black;
      height: auto;
      margin: 2% 0;
      max-width: 100%;
      overflow: hidden;
      .note-preview-title {
        ${'' /* border: 1px solid green; */}
        margin: 0px 10px 5px 0;
        text-decoration: none;
        text-align: left;
      }
      p {
        ${'' /* border: 1px solid blue; */}
        width: 95%;
        height: 46px;
        text-decoration: none;
        margin: 0;
        line-height: 23px;
        font-size: 14px;
        font: roboto;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .layerTwoContainerAll{
      border: 1px solid blue;
      width: 100%;
      ${flex('row')}
      flex-wrap: wrap;
      justify-content: space-around;
      .layerTwoContainer{
        ${'' /* located on next page */}
      border: 1px solid red;
      width: 100%;
      margin: 2px;
      ${flex()}
    }
    }
  }  
`;