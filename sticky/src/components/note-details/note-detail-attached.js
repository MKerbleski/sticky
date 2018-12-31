import React , { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import { 
    SlackNote, 
    PocketNote, 
} from './../index.js';
import { 
    getAttachedItems,
    editAttachedItems, 
} from '../../actions'

class AttachedList extends Component {
    componentDidMount(){
        this.props.getAttachedItems(this.props.stickyNote.id);
    }
    
    render(){
        if(this.props.store.notes.triggerAttached){
            this.props.getAttachedItems(this.props.stickyNote.id);
        }
        return <AttachedListDiv> 
                    {this.props.store.notes.attachedItems ? 
                        this.props.store.notes.attachedItems.map(item => {
                        if(item.slack_user_id){
                            return <SlackNote
                                    key={item.uuid} 
                                    item={item} 
                                    stickyNote={this.props.stickyNote} />
                        } else {
                            return <PocketNote 
                                    key={item.id} 
                                    stickyNote={this.props.stickyNote}
                                    item={item} />
                        }
                    }) :  null}
            </AttachedListDiv>
    }
}

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    getAttachedItems,
    editAttachedItems
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AttachedList)

const AttachedListDiv = styled.div`
    /* border: 1px solid red; */
    color: black;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    /* background: green; */

`