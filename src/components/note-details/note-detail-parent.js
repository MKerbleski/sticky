import React from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NoteDetailSelf } from '../index.js';
import { getAttachedItems, getNotes, getSingleNote } from '../../actions'

class NoteDetailParent extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        this.props.getSingleNote(this.props.note_id)
    }

    componentWillReceiveProps(nextProps){
        if(this.props.note_id !== nextProps.note_id){
            this.props.getSingleNote(nextProps.note_id)
        }
    }

    handleClick(url){
        this.props.redirect(url)
    }

    render(){
        const note = this.props.store.notes.notes[0]
        if(note){
            let parent
            if(note.has_parent_note){
                parent = note.parent_note
            } else {
                parent = null
            }
            // console.log("note-detail-parent", "\nnote:", note, "\nparent", parent)
            return (
                <NoteDetailParentDiv 
                    innerRef={instance => this.props.connectDropTarget(instance)}
                    // color={this.props.parentColor} 
                    style={{background: this.props.hover 
                        ? 'lightgreen' 
                        : null}}>
                    <Link 
                        // onClick={() => this.handleClick(
                        //     parent 
                        //         ?   `/${note.sticky_user_id}/note/${parent.id}` 
                        //         :   `/all-notes/` )}
                        className="link"
                        to={parent 
                            ?   `/${note.sticky_user_id}/note/${parent.id}` 
                            :   `/all-notes/`}
                    >
                        {this.props.hover 
                            ?   `Drop to send to main page`
                            :   parent
                                ? `back to parent (note #${parent.id})`
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
        } else {
            return (<h1>loading note-detail-page</h1>)
        }
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
            //this disables layer one droping if there is a nested child
            if(hover){

                //WILL EVENTUALLY CONDITIONALLY BECOME A PARENT
                    // const note = props.store.notes.notes[0]
                    // let parent
                    // let type
                    // if(note.has_parent_note){
                    //     parent = note.parent_note
                    //     type = 'note'
                    // } else {
                    //     parent = null
                    //     type = 'top'
                    // }

                //WILL DEFAULT TO 'TOP' FOR NOW
                return ({
                    type: 'top',
                    parent: null,
                    note: null,
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
    getNotes,
    getSingleNote
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