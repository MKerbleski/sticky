import React from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NoteDetailSelf } from '../index.js';
import { getAttachedItems, getNotes } from '../../actions'

class NoteDetailParent extends React.Component{
    // refreshNotes = (id) => {
    //     this.props.getAttachedItems(id)
    // }

    componentDidMount(){
        // this.props.getNotes(this.props.note_id)
    }

    render(){
        const note = this.props.store.notes.notes[0]
        const parent = note.parent_note
        console.log("note-detail-parent", note, parent)
        return (
            <NoteDetailParentDiv 
                innerRef={instance => this.props.connectDropTarget(instance)}
                // color={this.props.parentColor} 
                style={{background: this.props.hover 
                    ? 'lightgreen' 
                    : null}}>
                <Link 
                    // onClick={() => this.refreshNotes(this.props.note.parent_id)}
                    className="link"
                    to={note.has_parent_note 
                        ?   `/${note.sticky_user_id}/note/${note.parent}` 
                        :   `/all-notes/`}>
                        {note.has_parent_note 
                            ? `back to parent (note #${note.parent})`
                            : `back to All notes`}
                </Link>
                <NoteDetailSelf
                    type="note"
                    note={note}
                    parent={note.parent_note}
                    // allNotes={this.props.allNotes}
                    // allLinks={this.props.allLinks}
                    // onDrop={this.props.onDrop} 
                    // changeParent={this.props.changeParent}
                    // targetId={this.props.note.id}
                    // editNote={this.props.editNote}
                    // redirect={this.props.redirect}
                    
                    />
            </NoteDetailParentDiv>
        )
    }
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
                const note = props.store.notes.notes[0];
                console.log(props.note.has_parent_note)
                const target_type = props.note.has_parent_note ? 'note' : 'top'
                const parent = props.note.has_parent_note ? props.note.parent_note : null
                return ({
                    note, 
                    target_type,
                    parent
                });
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
    getAttachedItems,
    getNotes
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
    &::-webkit-scrollbar {
        width: 6px;
            &-thumb{
                background-color: gray;
                border-radius: 25px;
        }
    }
`;