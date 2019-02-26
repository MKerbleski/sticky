import React from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { 
    NoteDetailChild, 
    // NoteDetailBody,
    AttachedList,
} from '../index.js';
import { getAttachedItems } from '../../actions'
import { start } from '../../styles/styl-utils.js'
import { default as NoteQuill } from './note-detail-body-quill'
import axios from 'axios'



class NoteDetailSelf extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        //Get children for notes
        if(this.props.note.has_children){
            let children = this.props.note.children_attached
            if(localStorage.getItem('JWT')){
                const token = localStorage.getItem('JWT')
                const authHeader = {
                    headers: { Authorization: token }
                }
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notes/children`, ({children}), authHeader).then(res => {
                    this.setState({children: res.data.children})
                }).catch(err => {
                    console.log(err)
                })
            } else {
                console.log('there was no token found')      
            }
        }
    }

    render(){
        console.log("note detail self", this.props)
        if(this.props.note){
            return (
                <NoteDetailSelfDiv 
                    innerRef={instance => this.props.connectDropTarget(instance)}
                    // color={this.props.note.note_color}
                    className="note-detail" 
                    style={{background: this.props.hover ? 'lightgreen' : null}}>
                    <div className="note-detail-main">
                        <div className="note-detail-left">
                            {/* <NoteQuill note={this.props.note} /> */}
                            <p>{this.props.note.text_body}</p>
                            <div className="note-detail-children">
                                {this.props.store.notes.children ? this.props.store.notes.children.map(child => {
                                        return <NoteDetailChild
                                            type="note"
                                            // onDrop={this.props.onDrop}
                                            // changeParent={this.props.changeParent}
                                            key={child.id}
                                            layerOne={child}
                                            // allNotes={this.props.allNotes}
                                            // redirect={this.props.redirect}
                                            // color={child.note_color}
                                                />
                                }) : null}
                            </div>{/* noted-detail-children */}
                        </div>{/* note-detail-left */}
                        <div className="note-detail-right">
                            <AttachedList stickyNote={this.props.note} />
                        </div>{/* note-detail-right */}
                    </div>{/* note-detail-main */}
                    <div className="note-detail-settings">
                        <i className="fas fa-cogs"></i>
                    </div>{/* note-detail-settings */}
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
            const { type, targetId } = props;
            const pocket_items_attached = props.note.pocket_items_attached;
            const total_items_attached = props.note.total_items_attached;
            const slack_items_attached = props.note.slack_items_attached;
            return ({
                type, 
                targetId, 
                pocket_items_attached, 
                slack_items_attached,
                total_items_attached
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