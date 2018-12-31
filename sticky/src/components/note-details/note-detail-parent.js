import React from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NoteDetailSelf } from '../index.js';
import { getAttachedItems } from '../../actions'

class NoteDetailParent extends React.Component{
    refreshNotes = (id) => {
        this.props.getAttachedItems(id)
    }
    render(){
        console.log(this.props)
        return (
            <NoteDetailParentDiv 
                innerRef={instance => this.props.connectDropTarget(instance)}
                color={this.props.parentColor} 
                style={{background: this.props.hover ? 'lightgreen' : null}}>
                <Link 
                    onClick={() => this.refreshNotes(this.props.note.parent_id)}
                    className="link"
                    to={this.props.note.parent_id ? `/note/${this.props.note.parent_id}/` : `/all-notes/`}>back to parent note</Link>
                <NoteDetailSelf
                    allNotes={this.props.allNotes}
                    allLinks={this.props.allLinks}
                    note={this.props.note} 
                    onDrop={this.props.onDrop} 
                    changeParent={this.props.changeParent}
                    targetId={this.props.note.id}
                    editNote={this.props.editNote}
                    redirect={this.props.redirect}
                    type="note"/>
            </NoteDetailParentDiv>
        )
    }
}

const getNoteDetails = (props, id) => {
    console.log(props)
    return props.allNotes.find(note => {return note.id === +id})
}

const targetObj = {
    hover(props, component){
        //   if(props.hoverShallow){
        //       console.log('hoverShallow')
        //   }
        return
    },

    drop(props, monitor) {
        const hover =  monitor.isOver({shallow:true})
            if(hover){//this disables layer one droping if there is a nested child
                if(props.note.parent_id === null){
                    window.alert("There is no parent note")
                } else {
                    console.log(props)
                    let parentNote = getNoteDetails(props, props.note.parent_id)
                    console.log(parentNote)
                    const targetId = parentNote.id;
                    const type = props.type;
                    const pocket_items_attached = parentNote.pocket_items_attached;
                    const slack_items_attached = parentNote.slack_items_attached;
                    const total_items_attached = parentNote.total_items_attached;
                    return ({
                        targetId, 
                        type, 
                        pocket_items_attached, 
                        slack_items_attached,
                        total_items_attached,
                    });
                }
        }
    }
}

const collect = (connect,  monitor) => ({
  connectDropTarget: connect.dropTarget(),
  highlighted: monitor.canDrop(),
  hover: monitor.isOver({shallow: true}),
  hoverFalse: monitor.isOver()
});

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
getAttachedItems
}

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget('item', targetObj, collect)(NoteDetailParent))

const NoteDetailParentDiv = styled.div`
    background-color: ${props => props.color};
    ${'' /* above is for custom colors. below is a placeholder until I can figure out how to make them look good and custom */}
    background-color: white;
    border: 1px solid green;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    height: 95vh;
    overflow: auto;
    padding-bottom: 10px;
    .link {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 15px;
        margin: 8px;
        color: gray;
    }
`;