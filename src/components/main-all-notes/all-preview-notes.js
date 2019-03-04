import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { 
    NotePreviewNew,
    NotePreviewSelf
} from './index';
import { 
    getNotes,
    getDeletedNotes,
    getUserData,
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
        console.log(this.props)
        if(localStorage.getItem('JWT')){
            this.props.getUserData()
            if(this.props.deleteBin){
                this.props.getDeletedNotes();
            } else {
                this.props.getNotes(this.props.author);
            }
        } else {
            this.props.getNotes(this.props.author);
            console.log("NO JWT")
            // this.props.history.push('/welcome/login')
        }
    }
    
    componentWillReceiveProps(nextProps){
        if(this.props.deleteBin !== nextProps.deleteBin){
            console.log('delete bins arnt the same')
            if(nextProps.deleteBin){
                this.props.getDeletedNotes();
            } else {
                this.props.getNotes(nextProps.author);
            }
        }
    }

    render() {
        console.log('all notes')
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
                        return <NotePreviewSelf
                            key={note.id}
                            type="note"
                            parent={null}
                            note={note}
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

            //This is only ever a target
            return ({
                type: 'top',
                parent: null,
                note: null,
            })
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
    getDeletedNotes,
    getUserData
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