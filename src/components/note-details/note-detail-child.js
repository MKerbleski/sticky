import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { getSingleNote, editNote, noteToNote } from '../../actions'
import { flex, start } from '../../styles/styl-utils.js'
import { NoteDetailGrandChild } from './index';
import { sharedStickyNoteDrop } from '../../helpers'
import axios from 'axios'

class NoteDetailChild extends React.Component {
	constructor(){
		super()
		this.state = {

		}
	}
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
        this.fetchChildren()
	}
	
	fetchChildren(){
		if(this.props.note.has_children){
            let children = this.props.note.children_attached
            if(localStorage.getItem('JWT')){
                const token = localStorage.getItem('JWT')
                const authHeader = {
                    headers: { Authorization: token }
                }
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notes/children`, ({children}), authHeader).then(res => {
                    this.setState({children: res.data.children})
                }).catch(err => {
                    console.log(err)
                })
            } else {
                console.log('there was no token found')      
            }
        }
	}
  
    refreshNotes = (e, id) => {
        e.preventDefault()
		e.stopPropagation()
		this.setState({
			children: null
		})
		this.props.getSingleNote(id)
		this.fetchChildren()
    }

    render(){
        if (this.props.note){
            return (
                this.props.connectDragSource &&
                this.props.connectDropTarget &&
                <NoteDetailChildDiv 
                    innerRef={instance => {
						this.props.connectDragSource(instance);
						this.props.connectDropTarget(instance);}}
                    onClick={(e) => this.refreshNotes(e, this.props.note.id)}
                    color={this.props.color} >
                <Link
                    key={this.props.key}
                    index={this.props.index}
                    className="note-link"
                    id={this.props.note.id}
                    to={`/${this.props.note.sticky_user_id}/note/${this.props.note.id}`}
                    style={{background: this.props.hover ? 'lightgreen' : null}}>
                        <div className="note-content-header">
                            <h3 className="note-preview-title">
								{this.getFirstWord(this.props.note.text_body)}
							</h3>
                            {this.props.note.total_items_attached 
								?	<div className="note-content-link-count"> 
										{this.props.note.total_items_attached}
									</div> 
								:	null }
                        </div>
                        {/* <p>{this.getFirstSen(this.props.note.text_body)}</p>  */}
                        <div className="layerTwoContainerAll">
                            {this.state.children ? this.state.children.map(layerTwo => {
                                if (layerTwo.parent_id === this.props.note.id){
                                    return <NoteDetailGrandChild
                                                key={layerTwo.id}
                                                type="note"
                                                onDrop={this.props.onDrop} 
                                                layerTwo={layerTwo} 
                                                redirect={this.props.redirect}
                                                allNotes={this.props.allNotes}
                                                getFirstWord={this.getFirstWord} />
                                } else {
                                    return null
                                }
                            }) : null}
                        </div>                     
                  </Link>
                </NoteDetailChildDiv>        
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
		console.log('note-detail-child', props)
			const note = props.note
			const target_type = 'note'
			const parent = props.parent
			return ({
				note, 
				target_type,
				parent
			});
    }
  },
  hover(props, monitor){
  }
}

const sourceObj = {
    beginDrag(props) {
        // const { source_id } = props.layerOne; 
        return ({
            props
        });
    },

	endDrag(props, monitor) {
		if (!monitor.didDrop()) {
			return;
		}
		// const sourceId= props.layerOne.id
		// const dropResult = monitor.getDropResult();
		// console.log(sourceId,  dropResult, dropResult.targetId)
		// props.onDrop( sourceId, dropResult.type, dropResult.targetId  );
			// const sticky_source_id = props.layerOne.id;
			// const target = monitor.getDropResult();
			// const target_id = target.targetId;
			// let noteEdit = sharedStickyNoteDrop(sticky_source_id, target_id, target);
			// props.editNote(noteEdit)
		console.log(props)
		let noteEdit = sharedStickyNoteDrop(props, monitor);
		if(noteEdit === 'do nothing'){
			console.log("noteEdit", noteEdit)
		} else {
			props.noteToNote(noteEdit)
		}
	},
};

const mapStateToProps = store => {
  return {store: store};
}

const mapDispatchToProps = {
	getSingleNote,
  	editNote,
  	noteToNote
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
/* similarities to note preview */
  ${start('pink')}
  /* height: 99%; */
  width: 100%;
  display: flex;
  flex-direction: column;  
  justify-content: center;
  align-items: center;
  .note-link{
    ${start('red')}
    display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    width: 95%;
    height: 100%;
    padding: 10px;
    align-items: space-around;
    justify-content: flex-start;
    background-color: wheat;
    text-decoration: none;
    .note-content-header{
        border: 1px solid pink;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
          .note-content-title {
            border: 1px solid green;
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