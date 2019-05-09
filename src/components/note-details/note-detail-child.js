import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {DragSource, DropTarget} from 'react-dnd';
import flow from 'lodash/flow';
import {connect} from 'react-redux';

import { 
	editNote, 
	noteToNote
} from '../../actions'

import { 
	flexCenter, 
	border,
} from '../../styles/styl-utils.js'

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
  

    render(){
		const {
			note,
			connectDragSource,
			connectDropTarget,
			color,
			hover,
			redirect
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
						style={{background: hover ? 'lightgreen' : null}}>
							<div className="note-content-header">
								{note.num_slack_items_attached ||  note.num_pocket_items_attached
										? 	<div className="note-content-link-count">
												{note.num_pocket_items_attached + note.num_slack_items_attached}
											</div> 
										:   null }
							</div>
							<h3 className="note-content-title">
								{note.text_body}
							</h3>
							{/* <p>{this.getFirstSen(note.text_body)}</p>  */}
							<div className="layerTwoContainerAll">
								{note.has_children 
									? 	note.children.map(grandchild => {
											if(!grandchild.is_deleted){
												return <NoteDetailGrandChild
													key={grandchild.id}
													type="note"
													note={grandchild} 
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
			props.noteToNote(noteEdit)
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
	/* ${border('blue')} */
	${flexCenter('column')}
	width: 100%;
	border: 1px solid black;
	.note-link{
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: space-around;
		justify-content: flex-start;
		width: 95%;
		height: 100%;
		padding: 10px;
		background-color: wheat;
		text-decoration: none;
		.note-content-header{
			${border('red')}
			width: 100%;
			${flexCenter()}
			flex-direction: row-reverse;
			justify-content: space-between;
			.note-content-link-count {
				border: .5px solid black;
				border-radius: 50px;
				height: 20px;
				width: 20px;
				text-align: center;
				background: lightblue;
			}
		}
		.note-content-title {
			${border('green')}
			/* margin: 0px 10px 5px 0; */
			text-decoration: none;
			text-align: left;
		}
		.layerTwoContainerAll{
			border: 1px solid blue;
			width: 100%;
			${flexCenter('row')}
			flex-wrap: wrap;
			justify-content: space-around;
			.layerTwoContainer{
				${'' /* located on next page */}
				border: 1px solid red;
				width: 100%;
				margin: 2px;
				${flexCenter()}
			}
		}	
	}  
`;