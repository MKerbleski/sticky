import styled from 'styled-components';
import React from 'react';
import { DragSource, DropTarget, } from 'react-dnd';
import flow from 'lodash/flow'
import { connect } from 'react-redux';

// import { 
//     LayerThreeSource 
// } from "../index"
import { 
    editNote, 
    noteToNote 
} from '../../actions'

import { 
    sharedStickyNoteDrop 
} from '../../helpers'


class NoteDetailGrandChild extends React.Component {
    clickHandler = (e) => {
        e.preventDefault();
        this.props.redirect(`/${this.props.note.sticky_username}/note/${this.props.note.id}`)
    }
    
    render(){
        if (this.props.note){
            return (
                this.props.connectDragSource &&
                this.props.connectDropTarget &&
                    <NoteDetailGrandChildDiv 
                        innerRef={instance => {
                            this.props.connectDragSource(instance);
                            this.props.connectDropTarget(instance);}}
                        onClick={(e) => {e.stopPropagation(); this.clickHandler(e, this.props.note.id)}}
                        style={{background: this.props.hover ? 'lightgreen' : null}}
                    >
                        <h4>{this.props.note.text_body}</h4>
                        {/* CURRENTLY DISABLED BECASUE NOT BEING FETCHED FROM DB ANYWAYS AND PROBABLY DOESN'T NEED TO GO THIS DEEP */}
                        {/* <div className="layerThreeContainerAll">
                            {this.props.note.children > 0 
                                ?   this.props.note.children.map(grandchild => {
                                    console.log(grandchild)
                                        if(!grandchild.is_deleted){
                                            return <LayerThreeSource 
                                                key={grandchild.id}
                                                type="note"
                                                note={grandchild}
                                                parent={this.props.note}
                                                // changeParent={this.props.changeParent} 
                                                // onDrop={this.props.onDrop}
                                                // getFirstWord={this.props.getFirstWord}
                                                />
                                        } else {
                                            return null
                                        }
                                    })
                                :   null
                            }
                        </div>                      */}
                    </NoteDetailGrandChildDiv>         
                )
        } else {
            return null
        }
    }
}

const targetObj = {
    drop(props) {
        const note = props.note;
        const parent = props.parent
        return ({
            type: 'note',
            parent: parent,
            note: note,
        });
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
        if(!monitor.didDrop()){
            return;
        }
        // const sourceId = props.note.id;        
        // const dropResult = monitor.getDropResult({shallow: true});
        // props.onDrop(sourceId, dropResult.type, dropResult.targetId);
        // const sticky_source_id = props.note.id;
        // const target = monitor.getDropResult({shallow: true});
        // const target_id = target.targetId;
        // let noteEdit = sharedStickyNoteDrop(sticky_source_id, target_id, target);
        // props.editNote(noteEdit)
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
                author_name: props.grandParent.sticky_username,
                note_id: props.grandParent.id
            })
		}
    }
};

const mapStateToProps = store => {
    return {store: store};
}
  
const mapDispatchToProps = {
    editNote,
    noteToNote
}
  
export default connect(mapStateToProps, mapDispatchToProps)( flow(

    DropTarget('item', targetObj, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        highlighted: monitor.canDrop(),
        hover: monitor.isOver(),
        hoverShallow: monitor.isOver({shallow: true})
    })), 

    DragSource('item', sourceObj, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))

)(NoteDetailGrandChild));


const NoteDetailGrandChildDiv = styled.div`
    border: 2px solid black;
    margin: 1px;
    border-radius: 5px;
    background: black;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-between;
    width: 100%;
    overflow: visible;
    h4 {
        margin: 0px;
        width: 100%;
        color: white;
    }
    /* .layerThreeContainerAll{
        width: 100%;
        border: 1px solid green;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: safe flex-start;
        .layerThreeContainer{
            border: 1px solid red;
            height: 25px;
            width: 25px;
        }
    } */
`;