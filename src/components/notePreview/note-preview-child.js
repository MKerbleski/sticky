import styled from 'styled-components';
import React from 'react';
import { DragSource, DropTarget, } from 'react-dnd';
import flow from 'lodash/flow'
import { connect } from 'react-redux'

import { NotePreviewGrandChild } from "./index"
import { sharedStickyNoteDrop } from '../../helpers'
import { 
    // editNote, 
    noteToNote 
} from '../../actions'
import { 
    border
} from '../../styles'

class NotePreviewChild extends React.Component {
    
    goToNote = (e) => {
        e.stopPropagation();
        this.props.redirect(`/${this.props.note.sticky_username}/note/${this.props.note.id}`)
    }

    render(){
        const {
            connectDragSource, 
            connectDropTarget, 
            note,
            hover,
        } = this.props
        if (note){
            return (
                connectDragSource &&
                connectDropTarget &&
                    <NotePreviewChildDiv 
                        innerRef={instance => {
                            connectDragSource(instance)
                            connectDropTarget(instance)}}
                        type="note"
                        onClick={this.goToNote}
                        style={{background: hover ? 'lightgreen' : null}}
                    >
                        <div className="notePreviewChildHeader">
                            {note.num_slack_items_attached ||  note.num_pocket_items_attached
                                ? 	<div className="note-content-link-count">
                                    {/* {this.props.note.num_pocket_items_attached + this.props.note.num_slack_items_attached} */}
                                    </div> 
                                :   null 
                            }
                        </div>
                        
                        <h4>{note.text_body}</h4>

                        {note.has_children && note.children 
                            ?   <div className="layerThreeContainerAll">
                                    {
                                        note.children.map(grandchild => {
                                        return (!grandchild.is_deleted 
                                            ?   <NotePreviewGrandChild 
                                                        key={grandchild.id} 
                                                        type="note"
                                                        note={grandchild}
                                                        parent={note} 
                                                        redirect={this.props.redirect}
                                                    />
                                            :   null)
                                        })
                                    }
                                </div> 
                            :   null
                        }            
                    </NotePreviewChildDiv>       
                )
        } else {
            return null
        }
    }
}

const targetObj = {
    drop(props) {
        //these always should come from where they are created as the parent or children will be dependent on the props passed not the global state, 

        //this MUST come from state (note store) because it is being mapped over from note-preview-self
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
        const note = props.note;
        const parent = props.parent
        return ({
            type: 'note',
            parent: parent,
            note: note,
        });
    },

    endDrag(props, monitor) {
        if(!monitor.didDrop()){
            return ;
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
    }
};

const mapStateToProps = store => {
    return {store: store};
}
  
const mapDispatchToProps = {
    noteToNote
}
  
export default connect(mapStateToProps, mapDispatchToProps)(flow(

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

)(NotePreviewChild));

const NotePreviewChildDiv = styled.div`
    border: 2px solid black;
    border-radius: 15px;
    margin: 10px;
    padding: 10px;
    ${'' /* height: 90px; */}
    background: wheat;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: flex-start;
    overflow: hidden;
    width: 100px;
    .notePreviewChildHeader{
        /* ${border()} */
        display: flex;
        justify-content: flex-end;
    }
    h4 {
        ${'' /* border: 1px solid orange; */}
        margin: 0px;
    }
    .note-content-link-count{
        border: .5px solid black;
        border-radius: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background: lightblue;
        height: 5px;
        width: 5px;
    }
    .layerThreeContainerAll{
        /* border: 1px solid red; */
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        align-items: space-around;
        ${'' /* overflow: hidden; */}
    }
`;