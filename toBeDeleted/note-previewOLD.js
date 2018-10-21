import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';


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
    console.log(sourceId, dropResult)
    props.onDrop( sourceId, dropResult.target );
  },
};

class NotePreview extends React.Component {
  render(props)
}
const NotePreview = (props) => (
  props.connectDragSource(
    <div className="startObject"
      style={{
        opacity: props.isDragging ? 0 : 1,
      }}>
      <NotePreviewDiv >
        <Link
          key={props.key}
          index={props.index}
          className="note-link"
          id={props.layerOne.id}
          to={`/note/${props.layerOne.id}`}>

            <div key={props.index} className="note-preview">

              <div className="notTags">
                <h3>{props.layerOne.title}</h3>
                <p>{props.layerOne.textBody}</p>
                <p>Index: {props.index}</p>
                <p>userid: {props.layerOne.userid}</p>
                <p>parentid: {props.layerOne.parentid}</p>
                
              </div>
            </div>
        </Link>
      </NotePreviewDiv>
    </div>
  )
)



const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  isFoobar: true,
});

export default DragSource('item', sourceObj, collect)(NotePreview)

const NotePreviewDiv = styled.div`
  .note-preview {
    border: 1px solid lightgray;
    background: white;
    ${'' /* background-color: #F3F3F3; */}
    width: 200px;
    height: 200px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: black;
    .notTags{
      ${'' /* border: 1px solid green; */}
      width: 90%;
      max-height: 150px;
      overflow: auto;
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
    .tags {
      ${'' /* border: 1px solid red; */}
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
//                 to={`/note/${note.id}`}>
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
