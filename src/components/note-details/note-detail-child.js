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
	start,
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
        if (this.props.note && !this.props.note.is_deleted){
            return (
                this.props.connectDragSource &&
                this.props.connectDropTarget &&
                <NoteDetailChildDiv 
                    innerRef={instance => {
						this.props.connectDragSource(instance);
						this.props.connectDropTarget(instance);}}
                    color={this.props.color} 
				>
					<Link
						// key={this.props.key}
						// index={this.props.index}
						className="note-link"
						id={this.props.note.id}
						to={`/${this.props.note.sticky_username}/note/${this.props.note.id}`}
						style={{background: this.props.hover ? 'lightgreen' : null}}>
							<div className="note-content-header">
								{this.props.note.num_slack_items_attached ||  this.props.note.num_pocket_items_attached
										? 	<div className="note-content-link-count">
												{this.props.note.num_pocket_items_attached + this.props.note.num_slack_items_attached}
											</div> 
										:   null }
							</div>
							<h3 className="note-preview-title">
								{this.props.note.text_body}
							</h3>
							{/* <p>{this.getFirstSen(this.props.note.text_body)}</p>  */}
							<div className="layerTwoContainerAll">
								{this.props.note.has_children 
									? 	this.props.note.children.map(grandchild => {
											if(!grandchild.is_deleted){
												return <NoteDetailGrandChild
													key={grandchild.id}
													type="note"
													note={grandchild} 
													parent={this.props.note}
													redirect={this.props.redirect}
													// onDrop={this.props.onDrop} 
													// allNotes={this.props.allNotes}
													// getFirstWord={this.getFirstWord} 
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

const targetObj = {
	drop(props, monitor) {
		const hover =  monitor.isOver({shallow:true})
		//this disables layer one droping if there is a nested child

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
	${border('blue')}
	${flexCenter('column')}
	width: 100%;
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
			${border()}
			width: 100%;
			${flexCenter()}
			justify-content: space-between;
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
				/* ${start()} */
				${border()}
				box-sizing: border-box;
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
	}  
`;