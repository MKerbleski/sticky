import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {DragSource, DropTarget} from 'react-dnd';
import flow from 'lodash/flow';
import {connect} from 'react-redux';
import ReactHTMLParser from 'react-html-parser'

import { 
	editNote, 
	noteToNote
} from '../../actions'

import { 
	flexCenter, 
	border,
	scrollBar,
	linksBlue,
	childNoteColor
} from '../../styles'

import { 
	NoteDetailGrandChild
} from './index';

import { 
	sharedStickyNoteDrop 
} from '../../helpers'

class NoteDetailChild extends React.Component {
	constructor(){
		super()
		this.state = {
		}
	}
  
	scrollDown = (e) => {
		e.stopPropagation()
        const div = document.getElementsByClassName('noteDetailGrandchildrenContainer')
		div.scrollDown -= e.deltaY
    }

    render(){
		const {
			note,
			connectDragSource,
			connectDropTarget,
			color,
			hover,
			redirect,
			parent
		} = this.props

        if (note && !note.is_deleted){
            return (
                connectDragSource &&
                connectDropTarget &&
                <NoteDetailChildDiv 
                    innerRef={instance => {
						connectDragSource(instance);
						connectDropTarget(instance);}}
                    color={color}
				>
					<Link
						className="note-link"
						id={note.id}
						to={`/${note.sticky_username}/note/${note.id}`}
						style={{background: hover ? 'lightgreen' : null}}
					>
						<div className="noteDetailChildHeader">
							{note.num_slack_items_attached ||  note.num_pocket_items_attached
									? 	<div className="note-content-link-count">
											{note.num_pocket_items_attached + note.num_slack_items_attached}
										</div> 
									:   null }
						</div>
						<div className="noteDetailChildText">
							{ReactHTMLParser(note.text_body)}
						</div>
						{/* <p>{this.getFirstSen(note.text_body)}</p>  */}
						<div 
							className="noteDetailGrandchildrenContainer"
							onWheel={(e) => this.scrollDown(e)} 
						>
							{note.has_children 
								? 	note.children.map(grandchild => {
										if(!grandchild.is_deleted){
											return <NoteDetailGrandChild
												key={grandchild.id}
												type="note"
												note={grandchild} 
												grandParent={parent}
												parent={note}
												redirect={redirect}
											/>
										} else {
											return null
										} 
									})
								:	null}
						</div>
					</Link>
                </NoteDetailChildDiv>
            )
        } else {
            return null
        }
    }
}

// TODO this code is repeated
const targetObj = {
	drop(props, monitor) {
		const hover =  monitor.isOver({shallow:true})
		//this disables layer one dropping if there is a nested child

		if(hover){
			//	this MUST come from component state (props) because it is being mapped over from note-preview-self
			// as opposed to store
			const note = props.note
			const parent = props.parent
			return ({
				type: 'note',
				parent: parent,
				note: note,
			});
		}
	},
	hover(props, monitor){
	}
}

// TODO this code is repeated
const sourceObj = {
    beginDrag(props) {
        const note = props.note
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
		const note = props.note;
        const parent = props.parent
        const source = {
            type: 'note',
            parent: parent,
            note: note,
        }

		let noteEdit = sharedStickyNoteDrop(source, monitor);

		if(noteEdit !== null){
			props.noteToNote(noteEdit, {
				author_name: props.parent.sticky_username,
				note_id: props.parent.id
			})
		}
	},
};

const mapStateToProps = store => {
  	return {store: store};
}

const mapDispatchToProps = {
  	editNote,
  	noteToNote
}

export default connect(mapStateToProps, mapDispatchToProps)(
	flow(
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
	${border('blue')}
	${flexCenter('column')}
	width: 100%;
	border: 1px solid black;
	margin: 3px;
	box-shadow:  0px 0px 2px .5px gray;
	/* max-height: 150px; */
	/* height: 95%; */
	:hover{
		box-shadow:  0px 0px 4px 1px gray;
	}
	.note-link{
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: space-between;
		justify-content: flex-start;
		width: 100%;
		min-width: 100px;
		height: 100%;
		/* padding: 10px; */
		background-color: ${childNoteColor};
		text-decoration: none;
		color: black;
		.noteDetailChildHeader{
			${border('red')}
			/* width: 100%; */
			${flexCenter()}
			height: 10%;
			flex-direction: row-reverse;
			justify-content: space-between;
			.note-content-link-count {
				border: .5px solid black;
				border-radius: 50px;
				height: 20px;
				width: 20px;
				text-align: center;
				background: ${linksBlue};
			}
		}
		.noteDetailChildText {
			${border('green')}
			/* margin: 0px 10px 5px 0; */
			max-height: 40%;
			text-decoration: none;
			text-align: left;
			overflow: hidden;
			>*{
				margin: 0
			}
		}
		.noteDetailGrandchildrenContainer{
			${border()}
			${flexCenter()}
			${scrollBar(undefined, 'gray')}
			/* width: 100%; */
			flex-wrap: wrap;
			align-items: flex-start;
			justify-content: space-around;
			overflow: auto;
			min-height: 50px;
			/* height: 100%; */
			max-height: 60%;
		}	
	}  
`;