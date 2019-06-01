import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {DropTarget} from 'react-dnd';
import {Link} from 'react-router-dom';

import { 
    NotePreviewNew,
    NotePreviewSelf
} from '../components';

import { 
    getNotes,
    getDeletedNotes,
    getUserData,
    toggleNewNote
} from '../actions'

import {
    scrollBar,
    flexCenter,
    border,
} from '../styles'

class AllNotesPage extends Component {
    constructor(props){
        super(props);
        this.state = {
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
            // this.props.getNotes(this.props.author);
            console.log("NO JWT, allowed now because of public ability")
            // this.props.history.push('/welcome/login')
        }
    }
    
    componentWillReceiveProps(nextProps){
        if(this.props.deleteBin !== nextProps.deleteBin){
            // console.log('delete bins arnt the same')
            if(nextProps.deleteBin){
                this.props.getDeletedNotes(nextProps.author);
            } else {
                this.props.getNotes(nextProps.author);
            }
        }
    }

    render() {
        const {notes} = this.props.store.notes
        console.log('notes', notes)
        if(notes){
            return (
                <AllNotesPageDiv
                    type="top" 
                    innerRef={instance => this.props.connectDropTarget(instance)}
                    style={{background: this.props.hover 
                        ?   'lightgreen' 
                        :   this.props.deleteBin 
                            &&  'lightpink' 
                    }}>
                    
                    <h1>{this.props.author}'s {this.props.deleteBin && 'deleted'} Notes</h1>

                    {this.props.store.notes.fetchingNotes
                        ?   <p>loading notes</p>
                        :   <div>
                                {notes.length === 0 
                                    ? this.props.deleteBin 
                                        ?   <p>Nothing in trash</p>
                                        :   <div>
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
                                                            {localStorage.getItem('username') ? <Link to={`/${this.props.store.user.userData.username}`}>My Notes</Link> : <Link to={`/welcome/register`}>Sign Up to create your own</Link>}
                                                        </div>
                                                    :   null
                                                    
                                                }
                                            </div>
                                    :   null
                                }
                            </div>
                    }

                    {this.props.store.notes.showNewNote 
                        &&  !this.props.deleteBin 
                        &&  <NotePreviewNew /> 
                    } 

                    {this.props.store.user.userData.username === this.props.author 
                        &&  notes.length > 0
                        &&  <div className="all-note-preview-container">
                                {notes.map(note => {
                                    return <NotePreviewSelf
                                        key={note.id}
                                        type="note"
                                        parent={null}
                                        note={note}
                                        redirect={this.props.redirect}
                                        deleteBin={this.props.deleteBin 
                                            ? true 
                                            : false
                                        }
                                    />
                                })}
                            </div>
                    }
                    
                </AllNotesPageDiv>
            )
        } else {
            return <p>loading all notes</p>
        }
    }
}

const targetObj = {
    hover(props, component){
        // Pretty sure this is necessay as it is a requierment 
        if(props.hoverShallow){
        }
    },

    drop(props, monitor) {
        const hover = monitor.isOver({shallow:false})
        if(hover){
            //'all-notes-page' is only ever a target so type is hardcoded to top
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
    getUserData,
    toggleNewNote,
}

export default DropTarget('item', targetObj, collect)(connect(mapStateToProps, mapDispatchToProps)(AllNotesPage))

const AllNotesPageDiv = styled.div`
    /* ${border()} */
    height: 96vh;
    /* margin: 4px; */
    color: black;
    /* max-width: 99%; */
    box-sizing: border-box;
    ${flexCenter('column')}
    justify-content: flex-start;
    /* padding: 10px; */
    padding-top: 0;
    /* margin: 2px; */
    width: 100%;
    h1 {
        margin: 5px;
    }
    ${scrollBar()}
    .noNotes {
        /* ${border()} */
        ${flexCenter('column')}
        justify-content: flex-start;
    }
    .all-note-preview-container{
        /* ${border()} */
        padding: 2px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
    }
`;

// {this.props.deleteBin && notes.length === 0
//     ?   <div>
//             {/* USER PRIVATE PAGE VS Private page */}
//             {localStorage.getItem('username') === this.props.author
//                 ?   <div>Delete Bin is empty</div>
//                 :   <div>Page Protected</div> 
//             }
//         </div>
//     :   null
// }