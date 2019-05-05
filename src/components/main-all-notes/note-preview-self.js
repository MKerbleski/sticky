import React from 'react';
import styled from 'styled-components';
import flow from 'lodash/flow';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { NotePreivewChild } from "./index"
import { flex } from '../../styles/styl-utils.js'
import { sharedStickyNoteDrop } from '../../helpers'
import ReactHTMLParser from 'react-html-parser'

import { 
	deleteNote, 
	editNote, 
	// getChildren, 
	noteToNote, 
	getSingleNote
} from '../../actions'

import {
	border
} from '../../styles/styl-utils.js'

class NotePreviewSelf extends React.Component {
	state = {}

	//Necessary to avoid nested <a>tag warning</a>
	goToNote = (e) => {
		e.preventDefault()
		if(!this.props.deleteBin){
			this.props.redirect(`/${this.props.note.sticky_username}/note/${this.props.note.id}`)
		}
	}

	//This is for when 'all-preview-notes' becomes the delete bin
	clickHandler = (e) => {
		e.preventDefault()
		if(e.target.name === "delete"){
			this.props.deleteNote(this.props.note.id)
		} else if (e.target.name === "restore"){
			this.props.editNote({id: this.props.note.id, is_deleted: false}, true)
		}
	}
	
	//Converts a string of HTML saved on the server into useable HTML
	renderText(){
		let doc = new DOMParser().parseFromString(this.props.note.text_body, 'text/html')
		return doc
	}

    render(){
        if (this.props.note){
            return (
                this.props.connectDragSource &&
				this.props.connectDropTarget &&
                <NotePreviewSelfDiv 
					onClick={this.goToNote}
					innerRef={instance => {
						this.props.connectDragSource(instance)
						this.props.connectDropTarget(instance)}}
					color={this.props.note.note_color} >
                        <div 
                            key={this.props.key}
                            index={this.props.index}
                            className="note-link"
							id={this.props.note.id}
							style={{background: this.props.hover ? 'lightgreen' : null}} 
						>
                            <div className="note-content">
                                <div className="note-content-header">
									{/* EVENTUAL TITLE WILL GO HERE */}
                                    {this.props.note.is_deleted 
										?	<div>
												<button name="restore" onClick={this.clickHandler}>RESTORE</button>
												<button name="delete" onClick={this.clickHandler}>DELETE</button>
											</div> 
									  	: 	null}
                                      
                                    {this.props.note.num_slack_items_attached ||  this.props.note.num_pocket_items_attached
										? 	<div className="note-content-link-count">
												{this.props.note.num_pocket_items_attached + this.props.note.num_slack_items_attached}
											</div> 
										:   null }
										
                                </div>
								{/* {this.renderText()} */}
								{/* <ReactQuill preview value={this.props.note} /> */}
                                {ReactHTMLParser(this.props.note.text_body)}
                            </div>
                            <div className="layerTwoContainerAll"  >
                                {this.props.note.children ? this.props.note.children.map(layerTwo => {
									if(layerTwo.is_deleted){
										return null
									} else {
                                        return (
											<div 
												className="layerTwoContainer" 
												key={layerTwo.id}>
												<NotePreivewChild
													type="note"
													note={layerTwo} 
													parent={this.props.note}
													redirect={this.props.redirect}
													// onDrop={this.props.onDrop}
													// allNotes={this.props.allNotes}
													// getFirstWord={this.getFirstWord}
													 />
											</div>
										)
									}
                                }) : null}
                            </div> 
                        </div>
                      </NotePreviewSelfDiv>
                )
        } else {
            return null
        }
    }
}

const targetObj = {
	drop(props, monitor) {
		const hover =  monitor.isOver({shallow:true})
		//this allows other items to be dropped in a nested child component
		if(hover){
			
			//this MUST be from props not store
			const note = props.note;
			const parent = props.parent
			return ({
                type: 'note',
                parent: parent,
                note: note,
            });
		}
	},
	hover(props, monitor){
		//this could be used to display a warning or what not, but cannot be removed
	}
}

const sourceObj = {
    beginDrag(props) {
		const note = props.note;
		const parent = props.parent
		return ({
			type: 'note',
			parent: parent,
			note: note,
		});
    },

    endDrag(props, monitor) {
        if (!monitor.didDrop()) {
          	return;
		}
		//this needs to be established here as it varies _slightly_ from component to component
		const note = props.note;
		const parent = props.parent
		const source = {
			type: 'note',
			parent: parent,
			note: note,
		}

		let noteEdit = sharedStickyNoteDrop(source, monitor);
		if(noteEdit !== null){
			props.noteToNote(noteEdit)
		}
    },
};

const mapStateToProps = store => {
	return { store: store }
}

const mapDispatchToProps = {
	deleteNote,
	editNote,
	// getChildren,
	noteToNote,
	getSingleNote
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
)(NotePreviewSelf))

const NotePreviewSelfDiv = styled.div`
	border: 1px solid blue;
	padding: 10px;
	margin: 2px;
	/* width: 100%; */
	min-width: 300px;
	/* max-width: 50%; */
	height: auto;
	display: flex;
	flex-direction: column;  
	.note-link {
		${border()}
		/* ${ flexCenter('column') } */
		height: 100%;
		padding: 10px;
		width: 95%;
		padding: 10px;
		justify-content: space-around;
		background-color: lavender;
		background-color: ${props => props.color};
		.note-content{
			${border()}
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			color: black;
			min-width: 250px;
			height: auto;
			max-height: 100px;
			margin: 2% 0;
			.note-content-header{
				${border()}
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;
				.note-content-title {
					${border()}
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
				${border()}
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
			${border()}
			${flexCenter(undefined, undefined ,'space-around')}
			width: 100%;
			flex-wrap: wrap;
			.layerTwoContainer{
				${border()}
				${flexCenter()}
			}
		}
	}  
`;