import React from 'react';
import styled from 'styled-components';
import flow from 'lodash/flow';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { LayerTwoTargetSource } from "./index"
import { flex } from '../../styles/styl-utils.js'
import { deleteNote, editNote, getChildren } from '../../actions'
import { sharedStickyNoteDrop } from '../../helpers'
import ReactHTMLParser from 'react-html-parser'
import axios from 'axios'

class NotePreview extends React.Component {
	state = {}
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
	componentDidMount(){
		if(this.props.layerOne.has_children){
			console.log(this.props.layerOne.children_attached)

			let children = this.props.layerOne.children_attached
			console.log(children)
			if(localStorage.getItem('JWT')){
				const token = localStorage.getItem('JWT')
				const authHeader = {
					headers: { Authorization: token }
				}
				axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notes/children`, ({children}), authHeader).then(res => {
					console.log(res.data)
					this.setState({children: res.data.children})
					// return res.data
					// dispatch({type: NOTES_RECIEVED, payload: res.data})
				}).catch(err => {
					console.log({err})
				})
			} else {
				console.log('there was no token found')      
			}
		}
	}

    goToNote = (e) => {
        e.preventDefault()
        if(!this.props.deleteBin){
          this.props.redirect(`/note/${this.props.layerOne.id}`)
        }
    }

    clickHandler = (e) => {
        e.preventDefault()
        if(e.target.name === "delete"){
          this.props.deleteNote(this.props.layerOne.id)
        } else if (e.target.name === "restore"){
          this.props.editNote({id: this.props.layerOne.id, is_deleted: false}, true)
        }
    }
    
    renderText(){
      let doc = new DOMParser().parseFromString(this.props.layerOne.text_body, 'text/html')
      // console.log(doc)
      return doc
    }

    render(){
        if (this.props.layerOne){
            return (
                this.props.connectDragSource &&
                this.props.connectDropTarget &&
                <NotePreviewDiv 
					onClick={this.goToNote}
					innerRef={instance => {
						this.props.connectDragSource(instance)
						this.props.connectDropTarget(instance)}}
					color={this.props.layerOne.note_color} >
                        <div 
                            key={this.props.key}
                            index={this.props.index}
                            className="note-link"
                          id={this.props.layerOne.id}
                          style={{background: this.props.hover ? 'lightgreen' : null}} >
                            {/* {this.renderText()} */}
                            {/* <ReactQuill preview value={this.props.layerOne} /> */}
                            <div className="note-content">
                                <div className="note-content-header">
                                    {this.props.layerOne.is_deleted ?
                                      <div>
                                        <button name="restore" onClick={this.clickHandler}>RESTORE</button>
                                        <button name="delete" onClick={this.clickHandler}>DELETE</button>
                                      </div> : null}
                                    {this.props.layerOne.total_items_attached ? 
										<div className="note-content-link-count">
											{this.props.layerOne.total_items_attached}
										</div> : null }
                                </div>
                                {ReactHTMLParser(this.props.layerOne.text_body)}
                            </div>
                              <div className="layerTwoContainerAll"  >
                                {this.state.children ? this.state.children.map(layerTwo => {
                                    {/* if (layerTwo.parent_id === this.props.layerOne.id){ */}
                                        return (
											<div className="layerTwoContainer" key={layerTwo.id}>
												<LayerTwoTargetSource  
													type="note"
													// onDrop={this.props.onDrop}
													layerTwo={layerTwo} 
													redirect={this.props.redirect}
													allNotes={this.props.allNotes}
													getFirstWord={this.getFirstWord} />
											</div>
										)
                                    {/* } else {
                                        return null
                                    } */}
                                }) : null}
                            </div>                     
                        </div>
                      </NotePreviewDiv>        
                )
        } else {
            return (null)
        }
    }
}

const targetObj = {
  drop(props, monitor) {
      //so this somehow allows other items to be dropped in a nested child component
    const hover =  monitor.isOver({shallow:true})
	if(hover){//this disables layer one droping if there is a nested child
		console.log(props)
        const targetId = props.layerOne.id;
        const target = props.layerOne;
        const type = props.type;
        const pocket_items_attached = props.layerOne.pocket_items_attached;
        const slack_items_attached = props.layerOne.slack_items_attached;
        const total_items_attached = props.layerOne.total_items_attached;
        return ({
			target,
			targetId,
			type,
			slack_items_attached,
			pocket_items_attached,
			total_items_attached,
        });
    }
 },
 hover(props, monitor){
 }
}

const sourceObj = {
    beginDrag(props) {
		// console.log(props)
        const { source_id, parent_id } = props.layerOne; 
        return ({
		  source_id,
		  parent_id
        });
    },

    endDrag(props, monitor) {
        if (!monitor.didDrop()) {
          	return;
		}
		let noteEdit = sharedStickyNoteDrop(props, monitor);
		if(noteEdit.length<=1){
			props.editNote(noteEdit)
		} else {
			noteEdit.forEach(note => {
				props.editNote(note)
			})
		}
    },
};

const mapStateToProps = store => {
  return { store: store };
}

const mapDispatchToProps = {
  deleteNote,
  editNote,
  getChildren
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

)(NotePreview))

const NotePreviewDiv = styled.div`
  ${'' /* border: 1px solid blue; */}
  padding: 10px;
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;  
  .note-link{
    ${ flex('column') }
    padding: 10px;
    width: 95%;
    padding: 10px;
    justify-content: space-around;
    background-color: lavender;
    background-color: ${props => props.color};
      .note-content{
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
      .note-content-header{
        ${'' /* border: 1px solid pink; */}
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
          .note-content-title {
            ${'' /* border: 1px solid green; */}
            margin: 0px 10px 5px 0;
            text-decoration: none;
            text-align: left;
          }
          .note-content-link-count {
            border: .5px solid black;
            border-radius: 50px;
            height: 20px;
            width: 20px;
            text-align: center;
            background: lightblue;
          }

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
      flex-direction: row;
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
//                       <p>{note.text_body}</p>
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
