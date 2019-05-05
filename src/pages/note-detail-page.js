import React from 'react';
import styled from 'styled-components';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { 
    NoteDetailSelf, 
    Loading 
} from '../components/index.js';

import { 
    // getAttachedItems, 
    // getNotes, 
    getSingleNote 
} from '../actions'

import { 
    scrollBar,
    border,
    flexCenter
} from '../styles/styl-utils.js'

//Formorly NoteDetialParent
class NoteDetailPage extends React.Component{
    // constructor(props){
    //     super(props)
    //     this.state = {

    //     }
    // }

    componentDidMount(){
        this.props.getSingleNote(this.props.author, this.props.note_id)
    }

    componentWillReceiveProps(nextProps){
        if(this.props.note_id !== nextProps.note_id){
            this.props.getSingleNote(this.props.author, nextProps.note_id)
        }
    }

    // handleClick(url){
    //     this.props.redirect(url)
    // }

    // goToNote = (author, note_id=null) => {
    //     if(note_id){
    //         this.props.redirect(`/${author}/note/${note_id}`)
    //     } else {
    //         this.props.redirect(`/${author}`)
    //     }
	// }

    render(){
        console.log(this.props)
        const note = this.props.store.notes.notes[0]
        if(this.props.store.notes.responseCode === 401){
            //eventually will display whole format with a cool lock image over note
            return <h1>Unauthorized</h1>
        }
        if(note){
            let parent
            if(note.has_parent_note){
                parent = note.parent_note
            } else {
                parent = null
            }
            return (
                <NoteDetailPageDiv 
                    innerRef={instance => this.props.connectDropTarget(instance)}
                    // color={this.props.parentColor} 
                    style={{background: this.props.hover ? 'lightgreen' : null}}
                >
                    <div className="top-part">
                        {this.props.hover 
                            ?   <h2>Drop to send to main page</h2>
                            :   parent 
                                    ?   <Link 
                                            className="return-link"
                                            to={`/${parent.sticky_username}/note/${parent.id}`}
                                        >
                                            {`back to (note #${parent.id})`}
                                        </Link>
                                    :   <Link 
                                            className="return-link"
                                            to={`/${localStorage.getItem('username')}`}
                                        >
                                            {`back to My notes`}
                                        </Link>
                        }
                    </div>
                    <NoteDetailSelf
                        type="note"
                        note={note}
                        parent={note.parent_note}
                        redirect={this.props.redirect}
                    />
                </NoteDetailPageDiv>
            )
        } else {
            return <Loading />
        }
    }
}

const targetObj = {
    hover(props, component){
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
    // getAttachedItems,
    // getNotes,
    getSingleNote
}

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget('item', targetObj, collect)(NoteDetailPage))

const NoteDetailPageDiv = styled.div`
    box-sizing: border-box;
    background-color: ${props => props.color};
    ${'' /* above is for custom colors. below is a placeholder until I can figure out how to make them look good and custom */}
    background-color: white;
    ${border('red')}
    ${flexCenter('column')}
    justify-content: flex-start;
    margin: 2px;
    width: 100%;
    padding-bottom: 10px;
    .return-link {
        ${flexCenter()}
        padding: 15px;
        color: gray;
    }
    ${scrollBar()}
    .top-part{
        ${border()}
        ${flexCenter('column')}
        height: 10%;
    }
`;