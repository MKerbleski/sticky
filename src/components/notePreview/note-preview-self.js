import React from 'react';
import styled from 'styled-components';
import flow from 'lodash/flow';
import {DragSource, DropTarget} from 'react-dnd';
import {connect} from 'react-redux';
import ReactHTMLParser from 'react-html-parser'

import { 
	deleteNote, 
	editNote, 
	noteToNote, 
} from '../../actions'

import { 
	sharedStickyNoteDrop,
	getNElements
} from '../../helpers'

import { 
	NotePreivewChild 
} from "./index"

import {
	border,
	flexCenter,
	linksBlue,
	notePreviewColor,
	notePreviewSecondary
} from '../../styles'

class NotePreviewSelf extends React.Component {
	state = {}

	// Necessary to avoid nested <a>tag warning</a>
	goToNote = (e) => {
		e.preventDefault()
		if(!this.props.deleteBin){
			this.props.redirect(`/${this.props.note.sticky_username}/note/${this.props.note.id}`)
		}
	}

	// This is for when 'all-preview-notes' becomes the delete bin
	clickHandler = (e) => {
		e.preventDefault()
		if(e.target.name === "delete"){
			this.props.deleteNote(this.props.note.id)
		} else if (e.target.name === "restore"){
			this.props.editNote({id: this.props.note.id, is_deleted: false}, true)
		}
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
                            // key={this.props.key}
                            // index={this.props.index}
                            className="note-link"
							id={this.props.note.id}
							style={{background: this.props.hover ? 'lightgreen' : null}} 
						>
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
                            <div className="note-content">
								{/* {this.renderText()} */}
								{/* <ReactQuill preview value={this.props.note} /> */}
                                {ReactHTMLParser(getNElements(this.props.note.text_body))}
                            </div>
                            <div className="layerTwoContainerAll"  >
                                {this.props.note.children 
									? 	this.props.note.children.map(layerTwo => {
											if(layerTwo.is_deleted){
												return null
											} else {
												return 	<NotePreivewChild
															key={layerTwo.id}
															type="note"
															note={layerTwo} 
															parent={this.props.note}
															redirect={this.props.redirect}
															/>
											}
										}) 
									: 	null}
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
	noteToNote,
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
	${border('red')}
	/* padding: 10px; */
	/* height: auto; */
	/* display: flex; */
	/* flex-direction: column; */
	box-sizing: border-box;
	/* width: 100%; */
	.note-link {
		box-sizing: border-box;
		border: 1px solid gray;
		${border('pink')}
		border-radius: 4px;
		box-shadow: 0px 1px 2px gray;
		/* height: 100%; */
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		/* width: auto; */
		background-color: ${notePreviewColor};
		background-color: ${props => props.color};
		:hover{
			border: 2px solid gray;
			box-shadow: 0px 1px 4px gray;
		}
		.note-content{
			${border()}
			${flexCenter('column')}
			justify-content: space-between;
			/* background: ${notePreviewSecondary}; */
			/* box-shadow: 0 0 15px 10px ${notePreviewSecondary}; */
			color: black;
			min-width: 250px;
			max-width: 50%;
			height: auto;
			max-height: 100px;
			margin: 2% 0;
			/* ALL CHILDREN */
			> * {
				max-width: 99%;
				overflow: hidden;
				${border()}
				/* max-width: 100%; */
				margin: 0;
			}
			> p {
				/* THIS IS JANKY BUT FOR SOME REASON THE LENGTH OF THE WORD WAS 
				EFFECTING THE SIZE OF THE WHOLE DIV. NOW IT HAS A MAX WHICH IS 
				A LITTLE MORE THAN TWO CHILD DIVS SO IT WORKS.  */
				max-width: 250px;
				overflow-wrap: break-word;
			}
		}
		.note-content-header{
			${border()}
			${flexCenter()}
			/* width: 100%; */
			justify-content: flex-end;
			.note-content-title {
				/* ${border()} */
				margin: 0px 10px 5px 0;
				text-decoration: none;
				text-align: left;
			}
			.note-content-link-count {
				border: 1px solid black;
				border-radius: 50px;
				height: 20px;
				width: 20px;
				text-align: center;
				background: ${linksBlue};
			}
		}
		.layerTwoContainerAll{
			${border()}
			${flexCenter()}
			align-items: space-around;
			/* width: 100%; */
			flex-wrap: wrap;
		}
	}  
`;