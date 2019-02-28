import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { 
    NotePreviewNew,
    NotePreview
} from './index';
import { 
  getNotes,
  getDeletedNotes,
} from '../../actions'

class AllNotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            // stateNotes: false,
            // notes: [],
        }
    }

    componentDidMount(){
        if(localStorage.getItem('JWT')){
            if(this.props.deleteBin){
                this.props.getDeletedNotes();
            } else {
                this.props.getNotes();
            }
        } else {
            this.props.history.push('/welcome/login')
        }
    }

    render() {
        if(this.props.store.notes.notes){
            return (
                <AllNotesDiv
                    type="top" 
                    innerRef={instance => this.props.connectDropTarget(instance)}
                    style={{background: this.props.hover 
                        ?   'lightgreen' 
                        :   this.props.deleteBin 
                            ?   'red' 
                            :   null}}>
                    {this.props.store.notes.notes.length > 0 
                        ? null 
                        :   this.props.deleteBin 
                                ?   <div>Delete Bin is empty</div>
                                :   <div>
                                        <h3>Welcome!</h3>
                                        <p>Click the plus to the left to create a new note</p>
                                    </div> }
                    {this.props.showNewNote && !this.props.deleteBin 
                        ?   <NotePreviewNew toggleNewNote={this.props.toggleNewNote} /> 
                        :   null}        
                    {this.props.store.notes.notes.map(note => {
                        return <NotePreview
                            type="note"
                            parent={null}
                            note={note}
                            key={note.id}
                            redirect={this.props.redirect}
                            deleteBin={this.props.deleteBin ? true : false}
                            // onDrop={this.props.onDrop}
                            // siblings={this.props.store.notes.notes}
                            // changeParent={this.props.changeParent}
                            // allNotes={this.props.store.notes.notes}
                            />
                    })}
                </AllNotesDiv>
            )
        } else {
            return <p>loading all notes</p>
        }
    }
}

const targetObj = {
    hover(props, component){
        if(props.hoverShallow){
        }
    },

    drop(props, monitor) {
        const hover = monitor.isOver({shallow:false})
        if(hover){
            // const { type } = props;
            // return ({
            //     type,
            // });
            return {
                target_type: 'top',
                parent: null
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
  getNotes,
  getDeletedNotes
}

export default DropTarget('item', targetObj, collect)(connect(mapStateToProps, mapDispatchToProps)(AllNotes))

const AllNotesDiv = styled.div`
    /* border: 1px solid green; */
    color: black;
    overflow: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    padding: 20px;
    &::-webkit-scrollbar {
        width: 6px;
        &-thumb{
            background-color: gray;
            border-radius: 25px;
        }
    }
`;