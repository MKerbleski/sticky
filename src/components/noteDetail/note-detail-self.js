import React from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import axios from 'axios'

import NoteQuill from './note-detail-body-quill'

import { 
    NoteDetailChild, 
    NoteDetailAttachedList,
    NoteDetailNewChild
} from './index.js'

import {  
    editNote 
} from '../../actions'

import { 
    scrollBar,
    border,
    flexCenter,
    notePreviewColor
} from '../../styles'

class NoteDetailSelf extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    clickHandler = (e) => {
        switch(e.target.name){
            case "public":
                this.props.editNote({
                    id: this.props.store.notes.notes[0].id, 
                    is_public: !this.props.store.notes.notes[0].is_public})
                break;
            default:
                console.log("a button has no name") 
        }
    }

    scrollLeft = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(!this.state.scrollDown){
            const el = document.getElementById('noteDetailChildren') 
            el.scrollLeft -= e.deltaY *-.3
        }
    }

    render(){
        const note = this.props.store.notes.notes[0]
        if(note){
            return (
                <NoteDetailSelfDiv 
                    note={note}
                    innerRef={instance => this.props.connectDropTarget(instance)}
                    className="note-detail" 
                    style={{background: this.props.hover 
                        && 'lightgreen' 
                    }}
                >
                    <div className="noteDetailHeader">
                        Author: {this.props.note.sticky_username}
                    </div>
                    <div className="noteDetailMain">
                        <div className="noteDetailLeft" >
                            <NoteQuill 
                                className="noteDetailQuill" 
                                note={this.props.note}
                            />
                            {note.children || this.props.store.notes.showNewNote
                                ?   <div
                                        onWheel={this.scrollLeft} 
                                        className="noteDetailChildren" 
                                        id="noteDetailChildren" 
                                    >
                                        {this.props.store.notes.showNewNote 
                                            &&  <NoteDetailNewChild 
                                                    parent={note} 
                                                /> 
                                        }
                                        {note.children 
                                            &&  note.children.map(child => {
                                                    return <NoteDetailChild
                                                        updateState={this.updateState}
                                                        key={child.id}
                                                        type="note"
                                                        note={child}
                                                        parent={note}
                                                        redirect={this.props.redirect}
                                                    />})
                                        }
                                    </div>
                                :   null}
                        </div>
                        <div className="noteDetailRight">
                            {note.num_pocket_items_attached 
                            || note.num_slack_items_attached
                                ?   <NoteDetailAttachedList 
                                        note={note}
                                    />
                                :   null }
                        </div>
                        
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
            return  <p>note-detail-self is not displaying</p>
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
    /* border: 2px solid gray; */
    /* ${border('green')} */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 92%;
    background-color: ${notePreviewColor};
    padding: 5px;
    height: 80%;
    box-shadow: 0px 0px 0px 2px gray;
    /* min-height: 90%; */
    .noteDetailHeader{
        /* ${border('blue')} */
        width: 98%;
        margin: 3px;
        padding-left: 5px;
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
        .noteDetailRight {
            /* ${border('purple')} */
            ${scrollBar('3')}
            width: 29%;
            box-sizing: border-box;
            height: 98%;
            margin: 3px;
            overflow: auto;
            width: ${props => props.note.num_pocket_items_attached || props.note.num_slack_items_attached ? '30%': 'null'};
            display: ${props => props.note.num_pocket_items_attached || props.note.num_slack_items_attached ? 'flex': 'none' 
            };
        }
        .noteDetailLeft{
            box-sizing: border-box;
            /* ${border('purple')} */
            margin: 3px;
            width: 69%;
            display: flex;
            flex-direction: column;
            align-items: space-between;
            justify-content: space-between;
            /* max-width: 100%; */
            width: ${props => props.note.num_pocket_items_attached || props.note.num_slack_items_attached ? '70%': '100%' 
            };
            /* border: 1px solid gray; */
            /* background: white; */
            height: 98%;
            .noteDetailQuill {
                /* NEEDS TO BE EDITED ON COMPONENT */
            }
            .noteDetailChildren {
                /* border: 1px solid gray; */
                /* padding: 3px; */
                /* ${border('red')} */
                ${scrollBar('3')}
                /* box-sizing: border-box; */
                /* padding: 3px; */
                display: flex;
                flex-direction: row;
                justify-content: safe space-between;
                overflow: auto;
                height: 40%;
                margin-top: 6px;
                /* min-height: 100px; */
                max-width: 100%;
                /* margin-left: 3px; */
            }
        }
        
    }
    .note-detail-settings{
        ${border()}
        ${flexCenter()}
        border: 1px solid gray;
        box-sizing: border-box;
        width: 97%;
        margin: 8px;
        justify-content: flex-end;
        background: rgba(1,1,1,.05);
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

// .note-detail-right{
//     /* ${border()} */
//     ${scrollBar()}
//     box-sizing: border-box;
//     display: flex;
//     flex-direction: column;
//     border: 1px solid gray;
//     background: ${linksBlue};
//     color: white;
//     width: 25%;
//     /* margin: 5px; */
//     /* min-height: 98%; */
//     .link-source-container{
//         margin-bottom: 2px;
//         width: 99%;
//         overflow: auto; 
//     }
// } 