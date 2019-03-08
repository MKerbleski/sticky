import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { 
    NotePreviewNew,
    NotePreviewSelf
} from '../components/main-all-notes/index';
import { 
    getNotes,
    getDeletedNotes,
    getUserData,
} from '../actions'

import { Link } from 'react-router-dom';

class AllNotesPage extends Component {
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
                this.props.getDeletedNotes(this.props.author);
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
                this.props.getDeletedNotes(nextProps.author);
            } else {
                this.props.getNotes(nextProps.author);
            }
        }
    }

    render() {
        // console.log('all notes', this.props)
        const notes = this.props.store.notes.notes
        console.log('all notes', this.props)
        if(notes){
            return (
                <AllNotesPageDiv
                    type="top" 
                    innerRef={instance => this.props.connectDropTarget(instance)}
                    style={{background: this.props.hover 
                        ?   'lightgreen' 
                        :   this.props.deleteBin 
                            ?   'red' 
                            :   null}}>
                    
                    <h1> @{this.props.author}'s {this.props.deleteBin ? 'deleted' : null } Notes</h1>

                    {notes.length === 0 && this.props.deleteBin === false
                        ?   <div>
                                {/* USER PRIVATE PAGE */}
                                {localStorage.getItem('username') === this.props.author
                                    ?   <div className='noNotes'>
                                            <h3>Welcome!</h3>
                                            <p>Click the plus to the left to create a new note</p>
                                        </div> 
                                    :   null
                                }
                                
                                {/* USER PUBLIC PAGE */}
                                {this.props.store.user.userData 
                                && this.props.store.user.userData.username !== this.props.author
                                    ?   <div className='noNotes'>
                                            <h3>{this.props.author} has not published any notes yet. Please check back later.</h3>
                                            <Link to={`/${this.props.store.user.userData.username}`}>My Notes</Link>
                                        </div>
                                    :   null
                                    
                                }
                            </div>
                        :   null
                    }

                    {this.props.deleteBin && notes.length === 0
                        ?   <div>
                                {/* USER PRIVATE PAGE VS Private page */}
                                {localStorage.getItem('username') === this.props.author
                                    ?   <div>Delete Bin is empty</div>
                                    :   <div>Page Protected</div> 
                                }
                            </div>
                        :   null
                    }
                    
                    {this.props.showNewNote && !this.props.deleteBin 
                        ?   <NotePreviewNew toggleNewNote={this.props.toggleNewNote} /> 
                        :   null} 

                    {notes.map(note => {
                        return <NotePreviewSelf
                            key={note.id}
                            type="note"
                            parent={null}
                            note={note}
                            redirect={this.props.redirect}
                            deleteBin={this.props.deleteBin ? true : false}
                            />
                    })}

                </AllNotesPageDiv>
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

export default DropTarget('item', targetObj, collect)(connect(mapStateToProps, mapDispatchToProps)(AllNotesPage))

const AllNotesPageDiv = styled.div`
    border: 1px solid pink;
    margin: 4px;
    color: black;
    /* height: 100%; */
    max-width: 99%;
    border: 1px solid green;
    box-sizing: border-box;
    overflow: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    padding: 15px;
    margin: 2px;
    width: 100%;
    &::-webkit-scrollbar {
        width: 6px;
        &-thumb{
            background-color: gray;
            border-radius: 25px;
        }
    }
    .noNotes{
        /* border: 1px solid red; */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
`;