import React from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { default as NoteQuill } from './note-detail-body-quill'
// import axios from 'axios'

import {linksBlue} from '../../styles/colors'

import { 
    NoteDetailChild, 
    AttachedList,
} from '../index.js'

import {
    NotePreviewNew 
} from './../main-all-notes/index'

import {  
    editNote 
} from '../../actions'

import { 
    scrollBar,
    border,
    flexCenter
} from '../../styles/styl-utils.js'

class NoteDetailSelf extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    clickHandler = (e) => {
        switch(e.target.name){
            case "public":
                this.props.editNote({id: this.props.store.notes.notes[0].id, is_public: !this.props.store.notes.notes[0].is_public})
                break;
            default:
                console.log("button has no name") 
        }
    }
    
    render(){
        const note = this.props.store.notes.notes[0]
        if(note){
            return (
                <NoteDetailSelfDiv 
                    innerRef={instance => this.props.connectDropTarget(instance)}
                    // color={this.props.note.note_color}
                    className="note-detail" 
                    style={{background: this.props.hover ? 'lightgreen' : null}}>
                    <div className="noteDetailHeader">Author: {this.props.note.sticky_username}</div>
                    <div className="noteDetailMain">
                        <div className="note-detail-left">
                            {/* <NoteQuill note={this.props.note} /> */}
                            <p>{note.text_body}</p>
                            {note.children || this.props.store.notes.showNewNote
                                ?   <div id="note-detail-children" className="note-detail-children">
                                        {this.props.store.notes.showNewNote 
                                            ?   <NotePreviewNew parent={note} /> 
                                            :   null}
                                        {note.children 
                                            ?   note.children.map(child => {
                                                    return <NoteDetailChild
                                                        key={child.id}
                                                        type="note"
                                                        note={child}
                                                        parent={note}
                                                        redirect={this.props.redirect}
                                                    />})
                                            :   null 
                                        }
                                    </div>
                                :   null}
                            
                        </div>
                        
                        {note.slack_items || note.pocket_items
                            ?   <div className="note-detail-right">
                                    <AttachedList 
                                        note={note}
                                    />
                                </div>
                            :   <p>nothing attached</p>}
                        
                    </div>
                    <div className="note-detail-settings">
                        {localStorage.getItem('username') === this.props.note.sticky_username 
                            ?   <div>
                                    {this.props.note.is_public 
                                        ?   <i className="fas fa-unlock"></i> 
                                        :   <i className="fas fa-lock"></i>}
                                    <button name='public' onClick={this.clickHandler}>
                                        {this.props.note.is_public 
                                            ?   'Make note Private' 
                                            :   'make note PUBLIC'}
                                    </button>
                                </div>
                            :   null 
                        }
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
    editNote
}

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget('item', targetObj, collect)(NoteDetailSelf));

const NoteDetailSelfDiv = styled.div`
    /* ${border('green')} */
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 92%;
    background-color: lightgray;
    padding: 5px;
    height: 90%;
    min-height: 90%;
    .noteDetailHeader{
        /* ${border()} */
        width: 98%;
        margin: 3px;
    }
    .noteDetailMain{
        /* ${border('red')} */
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        /* align-items: center; */
        width: 99%;
        height: 100%;
        .note-detail-left{
            box-sizing: border-box;
            /* ${border('red')} */
            display: flex;
            flex-direction: column;
            align-items: space-between;
            justify-content: space-between;
            width: 74%;
            /* border: 1px solid gray; */
            /* background: white; */
            /* margin: 5px; */
            min-height: 98%;
            p {
                background: white;
                margin-top: 0;
                margin: 1px;
                padding: 3px;
                height: 66%;
            }
            .note-detail-children{
                ${border()}
                ${scrollBar('6')}
                border: 1px solid gray;
                box-shadow:  0px 0px 4px 1px gray;
                padding: 3px;
                display: flex;
                flex-direction: row;
                justify-content: safe space-around;
                overflow: auto;
                max-height: 40%;
                min-height: 100px;
            }
        }
        .note-detail-right{
            /* ${border()} */
            ${scrollBar()}
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            border: 1px solid gray;
            background: ${linksBlue};
            color: white;
            width: 25%;
            /* margin: 5px; */
            /* min-height: 98%; */
            .link-source-container{
                margin-bottom: 2px;
                width: 99%;
                overflow: auto; 
            }
        } 
    }
    .note-detail-settings{
        ${border()}
        ${flexCenter()}
        border: 1px solid gray;
        box-sizing: border-box;
        width: 99%;
        margin: 8px;
        justify-content: flex-end;
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