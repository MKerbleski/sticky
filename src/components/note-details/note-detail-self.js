import React from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { 
    NoteDetailChild, 
    // NoteDetailBody,
    // AttachedList,
} from '../index.js';
import { getAttachedItems, editNote } from '../../actions'
import { start } from '../../styles/styl-utils.js'
// import { default as NoteQuill } from './note-detail-body-quill'
// import axios from 'axios'

class NoteDetailSelf extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    clickHandler = (note) => {
        console.log('click detail self', note)
        this.props.editNote({id: this.props.store.notes.notes[0].id, is_public: !this.props.store.notes.notes[0].is_public})
    }

    render(){
        const note = this.props.store.notes.notes[0]
        // console.log("note detail self", note)
        if(note){
            return (
                <NoteDetailSelfDiv 
                    innerRef={instance => this.props.connectDropTarget(instance)}
                    // color={this.props.note.note_color}
                    className="note-detail" 
                    style={{background: this.props.hover ? 'lightgreen' : null}}>
                    <div className="note-detail-main">
                        <div className="note-detail-left">
                            {/* <NoteQuill note={this.props.note} /> */}
                            <p>{note.text_body}</p>
                            <div className="note-detail-children">
                                {note.children 
                                    ? note.children.map(child => {
                                        return <NoteDetailChild
                                            key={child.id}
                                            type="note"
                                            note={child}
                                            parent={note}
                                            redirect={this.props.redirect}
                                        />
                                }) : null}
                            </div>
                        </div>
                        <div className="note-detail-right">
                            {/* <AttachedList stickyNote={this.props.note} /> */}
                        </div>
                    </div>
                    <div className="note-detail-settings">
                    <p>From user: {this.props.note.sticky_username}</p>
                        {localStorage.getItem('username') === this.props.note.sticky_username 
                            ? 
                                <div>
                                    {this.props.note.is_public 
                                        ? <i className="fas fa-unlock"></i> 
                                        : <i className="fas fa-lock"></i>}
                                <button onClick={this.clickHandler}>{this.props.note.is_public 
                                    ? 'Make note Private' 
                                    : 'make note PUBLIC'}</button>
                            <i className="fas fa-cogs"></i>
                            </div>
                        : null}
                    </div>
                </NoteDetailSelfDiv>
            )
        } else {
            return  <p>note-detail-self</p>
        }
    }
}

const targetObj = {
    hover(props, component){
        if(props.hoverShallow){
            // console.log('hoverShallow')
        }
    },
    drop(props, monitor) {
        const hover = monitor.isOver({shallow: false})
        
        if(hover){
            const note = props.store.notes.notes[0];
            let parent
            if(note.has_parent){
                parent = props.store.notes.notes[0].parent_note
            } else {
                parent = null
            }
			return ({
                type: 'note',
                parent: parent,
                note: note,
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
    editNote
}

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget('item', targetObj, collect)(NoteDetailSelf));

const NoteDetailSelfDiv = styled.div`
    ${start('red')}
    justify-content: center;
    height: auto;
    width: 89%;
    background-color: lightgray;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 5px;
    .note-detail-main{
        ${start('green')}
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        .note-detail-left{
            ${start('white')}
            width: 70%;
            margin: 5px;
            height: 99%;
            flex-direction: column;
            align-items: space-between;
            justify-content: space-between;
            .note-detail-children{
                ${start('purple')}
                flex-direction: row;
                justify-content: safe space-around;
                overflow: auto;
                height: 50%;
                min-height: 100px;
                &::-webkit-scrollbar {
                    width: 6px;
                        &-thumb{
                            background-color: gray;
                            border-radius: 25px;
                    }
                }
                .note-detail-child-container{
                    ${start('blue')}
                    min-width: 24%;
                    margin: 0 3px;
                }
            }
        }
        .note-detail-right{
            /* ${start('red')} */
            flex-direction: column;
            background: skyblue;
            color: white;
            width: 30%;
            margin: 5px;
            height: 99%;
            overflow: auto;
            &::-webkit-scrollbar {
            width: 6px;
                &-thumb{
                    background-color: gray;
                    border-radius: 25px;
                }
            }
            .link-source-container{
                margin-bottom: 2px;
                width: 99%;
                overflow: hidden;   
            }
        } 
    }
    .note-detail-settings{
        ${start('blue')}
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        .settings-link, i{
            margin: 0 10px;
            text-decoration: none;
            color: black;
            &:hover{
                text-decoration: underline;
            }
        }
    }
`;