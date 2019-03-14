import React from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { 
    NoteDetailChild, 
    // NoteDetailBody,
    AttachedList,
} from '../index.js';
import { 
    // getAttachedItems, 
    editNote 
} from '../../actions'
import { start } from '../../styles/styl-utils.js'
// import { default as NoteQuill } from './note-detail-body-quill'
// import axios from 'axios'

class NoteDetailSelf extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    clickHandler = (e) => {
        switch(e.target.name){
            case "public":
                this.props.editNote({id: this.props.store.notes.notes[0].id, is_public: !this.props.store.notes.notes[0].is_public})
                break;
            case "fork": 
                console.log("fork settings are coming soon!")
                break;
            case "edit": 
                console.log("edit settings are coming soon!")
                break;
            case "share": 
                console.log("share settings are coming soon!")
                break;
            case "delete": 
                console.log("delete settings are coming soon!")
                break;
            default:
                console.log("button has no name") 

        }
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
                            {note.children 
                                ?   <div className="note-detail-children">
                                        {note.children.map(child => {
                                            return <NoteDetailChild
                                                key={child.id}
                                                type="note"
                                                note={child}
                                                parent={note}
                                                redirect={this.props.redirect}
                                            />})}
                                    </div>
                                :   null}
                            
                        </div>
                        
                        {this.props.note.num_slack_items_attached || this.props.note.num_pocket_items_attached
                            ?   <div className="note-detail-right">
                                    <AttachedList 
                                        note={note}
                                    />
                                </div>
                            :   null}
                        
                    </div>
                    <div className="note-detail-settings">
                    <p>Author: {this.props.note.sticky_username}</p>
                        {localStorage.getItem('username') === this.props.note.sticky_username 
                            ? 
                                <div>
                                    {this.props.note.is_public 
                                        ? <i className="fas fa-unlock"></i> 
                                        : <i className="fas fa-lock"></i>}
                                    <button name='public' onClick={this.clickHandler}>
                                        {this.props.note.is_public 
                                            ? 'Make note Private' 
                                            : 'make note PUBLIC'}
                                    </button>
                                    <button name='fork' onClick={this.clickHandler}>
                                        Allow Forks
                                    </button>
                                    <button name='clone' onClick={this.clickHandler}>
                                        Allow Clones
                                    </button>
                                    <button name='edit' onClick={this.clickHandler}>
                                        Allow Edits
                                    </button>
                                    <button name='share' onClick={this.clickHandler}>
                                        Share
                                    </button>
                                    <button >
                                        <i name='delete' onClick={this.clickHandler}className=" menu-item fas fa-trash-alt"></i>
                                    </button>
                                    <button >
                                       Make all children the same privacy settings
                                    </button>
                                    <i className="fas fa-cogs"></i>
                                </div>
                            :   <button onClick={this.clickHandler}>Pin Note</button>}
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
    // getAttachedItems,
    editNote
}

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget('item', targetObj, collect)(NoteDetailSelf));

const NoteDetailSelfDiv = styled.div`
    /* ${start('red')} */
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    /* height: auto; */
    width: 92%;
    background-color: lightgray;
    padding: 5px;
    height: 80%;
    /* height: 1000px; */
    .note-detail-main{
        /* ${start('green')} */
        border: 1px solid green;
        margin: 1px;
        padding: 1px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        .note-detail-left{
            /* ${start('white')} */
            border: 1px solid red;
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
            align-items: space-between;
            justify-content: space-between;
            width: 100%;
            margin: 5px;
            height: 98%;
            padding: 1px;
            .note-detail-children{
                /* ${start('purple')} */
                border: 1px solid purple;
                margin: 2px;
                padding: 1px;
                display: flex;
                flex-direction: row;
                justify-content: safe space-around;
                overflow: auto;
                max-height: 40%;
                min-height: 100px;
                &::-webkit-scrollbar {
                    width: 6px;
                        &-thumb{
                            background-color: gray;
                            border-radius: 25px;
                    }
                }
                /* .note-detail-child-container{
                    ${start('blue')}
                    min-width: 24%;
                    margin: 0 3px;
                } */
            }
        }
        .note-detail-right{
            /* ${start('red')} */
            border: 1px solid gray;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            background: skyblue;
            color: white;
            width: 30%;
            margin: 5px;
            height: 98%;
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
        /* ${start('blue')} */
        border: 1px solid blue;
        box-sizing: border-box;
        margin: 1px;
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