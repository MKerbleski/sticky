import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import { picture, solid, center } from './../styles/styl-utils.js'


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
  render(props){
      // console.log(this.props.hover)
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
                  <div className="startObject"
                  // style={{
                  //   opacity: props.isDragging ? 0 : 1,
                  // }}
                  >
                    <NotePreviewDiv >
                      <Link
                        key={this.props.key}
                        index={this.props.index}
                        className="note-link"
                        id={this.props.layerOne.id}
                        to={`/all-notes/${this.props.layerOne.id}`}>

                          <div key={this.props.index} className="note-preview">

                            <div className="noteContent">
                              <h3>{this.props.layerOne.title}</h3>
                              <p>content: {this.props.layerOne.textBody}  -- </p>
                              <span>Id: {this.props.layerOne.id}  --  </span>
                              <span>userid: {this.props.layerOne.userid}  --  </span>
                              <span>parentid: {this.props.layerOne.parentid}  </span>
                              
                            </div>
                            <div className="layerTwoContainer" style={{background: this.props.hover ? 'lightgreen' : null}}>
                              {this.props.allNotes.map(layerTwo => {
                                  if (layerTwo.parent_id === this.props.layerOne.id){return (
                                          <div key={layerTwo.id} >
                                              <LayerTwoTargetSource 
                                                type="note"
                                                onDrop={this.props.onDrop} 
                                                layerTwo={layerTwo} 
                                                allNotes={this.props.allNotes} />
                                          </div>)
                                  } else {
                                      return null
                                  }
                              })}
                          </div>                     
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
  border: 1px solid blue;
  width: 300px;
  .note-preview {
    border: 1px solid lightgray;
    background: white;
    ${'' /* background-color: #F3F3F3; */}
    ${'' /* width: 200px;
    height: 200px; */}
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: black;
    .noteContent{
      border: 1px solid green;
      width: 90%;
      max-height: 150px;
      overflow: hidden;
      margin: 2% 0;
      h3{
        ${'' /* border: 1px solid green; */}
        margin: 10px 10px 5px 0;
        text-decoration: none;
        border-bottom: 1px solid black;
      }
      p {
        ${'' /* border: 1px solid blue; */}
        width: 95%;
        height: 40%;
        padding-bottom: 10px;
        overflow: auto;
        text-decoration: none;
        margin: 0;
        line-height: 23px;
        font-size: 14px;
        font: roboto;
      }
    }
    .layerTwoContainer{
      border: 1px solid red;
      width: 100%;
      ${ center }
      justify-content: space-around
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
