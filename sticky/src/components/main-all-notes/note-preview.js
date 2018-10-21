import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import { flex } from '../../styles/styl-utils.js'

import LayerTwoTargetSource from "./layerTwoTargetSource"

const targetObj = {
  drop(props, monitor) {
      //so this somehow allows other items to be dropped in a nested child component
    const hover =  monitor.isOver({shallow:true})
             //  const hoverfalse =  monitor.isOver({shallow:false})
 //              console.log(hover)
 //              console.log(hoverfalse)
 //    console.log(props)
  if(hover){//this disables layer one droping if there is a nested child

     const targetId = props.layerOne.id;
     const type = props.type;
     console.log('targetId: ', targetId)
     console.log('targetType: ', type)
     return ({
         targetId, type
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
    // const  { id }  = monitor.getItem(); 
    const sourceId= props.layerOne.id
    const dropResult = monitor.getDropResult();
    console.log(sourceId,  dropResult, dropResult.targetId)
    props.onDrop( sourceId, dropResult.type, dropResult.targetId  );
  },
};

class NotePreview extends React.Component {
  
  getFirstWord = (text, words=2) => {
    // let firstWord = text.substr(0, text.indexOf(" "));
    let firstWord = text.split(" ").slice(0,words).join(' ');
    // console.log(firstWord, 'word')
    if(firstWord.length > 0){
      return firstWord
    } else {
      return text
    }
  }

  getFirstSen = (text) => {
    // let firstSen = text.substr(0, text.indexOf("."));    
    // or 
    let firstSen = text

    let firstWord = this.getFirstWord(text)
    firstSen = firstSen.replace(firstWord, '')

    
    if(firstSen !== firstWord){
      return firstSen
    } else{
      return null
    }
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
                  <div className="startObject">
                    <NotePreviewDiv >
                      <Link
                        key={this.props.key}
                        index={this.props.index}
                        className="note-link"
                        id={this.props.layerOne.id}
                        to={`/note/${this.props.layerOne.id}`}
                        style={{background: this.props.hover ? 'lightgreen' : null}}>
                            <div className="noteContent">
                              <h3 className="note-preview-title">{this.getFirstWord(this.props.layerOne.textBody)}</h3>
                              <p>{this.getFirstSen(this.props.layerOne.textBody)}</p> 
                            </div>
                            <div className="layerTwoContainerAll"  >
                              {this.props.allNotes.map(layerTwo => {
                                  if (layerTwo.parent_id === this.props.layerOne.id){return (
                                          <div className="layerTwoContainer" key={layerTwo.id}>
                                              <LayerTwoTargetSource  
                                                type="note"
                                                onDrop={this.props.onDrop} 
                                                layerTwo={layerTwo} 
                                                allNotes={this.props.allNotes}
                                                getFirstWord={this.getFirstWord} />
                                          </div>
                                          )
                                  } else {
                                      return null
                                  }
                              })}
                          </div>                     
                      </Link>
                    </NotePreviewDiv>        
                  </div>
                  )
                  )
              )
      } else {
          return (null)
      }
  }
}

export default flow(

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

)(NotePreview);

const NotePreviewDiv = styled.div`
  ${'' /* border: 5px solid blue; */}
  padding: 10px;
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;  
  .note-link{
    ${'' /* border: 1px solid green; */}
    ${ flex('column') }

    padding: 10px;
    width: 95%;
    padding: 10px;
    justify-content: space-around;
    background-color: lightgray;
      .noteContent{
      ${'' /* border: 1px solid green; */}

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      color: black;
      width: 250px;
      height: auto;
      ${'' /* flex-wrap: wrap; */}
      max-height: 100px;
      margin: 2% 0;
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
    .layerTwoContainer{
      ${'' /* border: 1px solid red; */}
      ${flex()}
    }
    .layerTwoContainerAll{
      ${'' /* border: 1px solid blue; */}
      width: 100%;
      ${flex()}
      flex-wrap: wrap;
      justify-content: space-around;
    }
    .tags {
      border: 1px solid red;
      display: flex;
      flex-direction: row:
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-end;
      width: 90%;
      bottom: 0;
      overflow: hidden;
      ${'' /* overflow: hidden; */}
      div {
        border: 1px solid lightgray;
        margin: 2px;
        padding: 4px;
      }
    }
  }  
`;



//old way if
// export default class NotePreview extends Component {
//
//   render() {
//     // console.log(this.props)
//     const { note, index, key } = this.props;
//
//     return (
//             <NotePreviewDiv>
//               <Link
//                 key={key}
//                 index={index}
//                 className="note-link"
//                 id={note.id}
//                 to={`/all-notes/${note.id}`}>
//
//                   <div key={index} className="note-preview">
//
//                     <div className="notTags">
//                       <h3>{note.title}</h3>
//                       <p>{note.textBody}</p>
//                     </div>
//
//                     <div className="tags">
//                       {(note.tags.length > 0) ?
//                         note.tags.map(tag => {
//                               return (<div key={tag}>{tag}</div>)
//                             }
//                         ) :
//                         null}
//                     </div>
//                   </div>
//               </Link>
//             </NotePreviewDiv>)
// }
// }
