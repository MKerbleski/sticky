import React from 'react';
import styled from 'styled-components';
import flow from 'lodash/flow';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { NotePreivewChild } from "./index"
import { flex } from '../../styles/styl-utils.js'
import { deleteNote, editNote, getChildren, noteToNote } from '../../actions'
import { sharedStickyNoteDrop } from '../../helpers'
import ReactHTMLParser from 'react-html-parser'

class NotePreviewSelf extends React.Component {
	state = {}

	goToNote = (e) => {
		e.preventDefault()
		if(!this.props.deleteBin){
			this.props.redirect(`/${this.props.note.sticky_username}/note/${this.props.note.id}`)
		}
	}

	clickHandler = (e) => {
		e.preventDefault()
		if(e.target.name === "delete"){
			this.props.deleteNote(this.props.note.id)
		} else if (e.target.name === "restore"){
			this.props.editNote({id: this.props.note.id, is_deleted: false}, true)
		}
	}
    
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
							style={{background: this.props.hover ? 'lightgreen' : null}} >
                            {/* {this.renderText()} */}
                            {/* <ReactQuill preview value={this.props.note} /> */}
                            <div className="note-content">
                                <div className="note-content-header">
                                    {this.props.note.is_deleted ?
                                      <div>
                                        <button name="restore" onClick={this.clickHandler}>RESTORE</button>
                                        <button name="delete" onClick={this.clickHandler}>DELETE</button>
                                      </div> : null}
                                    {this.props.note.total_items_attached ? 
										<div className="note-content-link-count">
											{this.props.note.total_items_attached}
										</div> : null }
                                </div>
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
            return (null)
        }
    }
}

const targetObj = {
	drop(props, monitor) {
		const hover =  monitor.isOver({shallow:true})
		//this allows other items to be dropped in a nested child component
		if(hover){
			
			//this must be from props not store
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
	getChildren,
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
)(NotePreviewSelf))

const NotePreviewSelfDiv = styled.div`
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
