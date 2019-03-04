import styled from 'styled-components';
import React from 'react';
import { DragSource, DropTarget, } from 'react-dnd';
import flow from 'lodash/flow'
import { NotePreviewGrandChild } from "./index"
import { sharedStickyNoteDrop } from '../../helpers'
import { editNote, noteToNote } from '../../actions'
import { connect } from 'react-redux'

class NotePreviewChild extends React.Component {
    
    goToNote = (e) => {
        e.stopPropagation();
        this.props.redirect(`/${this.props.note.sticky_username}/note/${this.props.note.id}`)
    }

    render(){
        const {
            connectDragSource, 
            connectDropTarget, 
        } = this.props
        console.log(this.props.note)
        if (this.props.note){
            return (
                connectDragSource &&
                connectDropTarget &&
                    <LayerTwoDiv 
                        innerRef={instance => {
                            this.props.connectDragSource(instance)
                            this.props.connectDropTarget(instance)}}
                        type="note"
                        onClick={this.goToNote}
                        style={{background: this.props.hover ? 'lightgreen' : null}}>
                        <h4>{this.props.note.text_body}</h4>
                        {this.props.note.has_children 
                            ?   <div className="layerThreeContainerAll">
                                    {this.props.note.children 
                                        ?   this.props.note.children.map(grandchild => {
                                            console.log(grandchild)
                                                if(!grandchild.is_deleted){
                                                    return (
                                                        <div 
                                                            className="layerThreeContainer" 
                                                            key={grandchild.id} 
                                                        >
                                                            <NotePreviewGrandChild 
                                                                type="note"
                                                                note={grandchild}
                                                                parent={this.props.note} 
                                                                redirect={this.props.redirect}
                                                                // changeParent={this.props.changeParent} 
                                                                // onDrop={this.props.onDrop}
                                                                // getFirstWord={this.props.getFirstWord}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            })
                                    :   null    }
                                </div> 
                            :   null
                        }            
                    </LayerTwoDiv>       
                )
        } else {
            return (null)
        }
    }
}

const targetObj = {
    drop(props) {
        //these always should come from where they are created as the parent or children will be dependent on the props passed not the global state, 

        //this MUST come from state because it is being mapped over from note-preview-self
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
    editNote,
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

const LayerTwoDiv = styled.div`
    border: 2px solid black;
    border-radius: 20px;
    margin: 10px;
    padding: 10px;
    ${'' /* height: 90px; */}
    background: wheat;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: flex-start;
    overflow: visible;
    h4 {
        ${'' /* border: 1px solid orange; */}
        margin: 0px;
    }
    .layerThreeContainerAll{
        ${'' /* border: 1px solid red; */}
        ${'' /* border: 1px solid green; */}
        ${'' /* height: 500px; */}
        ${'' /* background: gray; */}
        ${'' /* height: 90px; */}
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: space-around;
        ${'' /* overflow: hidden; */}
        .layerThreeContainer{
            ${'' /* border: 1px solid red; */}
            height: 25px;
        }
    }
`;