import React , { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import { 
    SlackNote, 
    PocketNote, 
} from './../index.js';
import { 
    // getAttachedItems,
    editAttachedItems, 
} from '../../actions'

class AttachedList extends Component {
    componentDidMount(){
        // this.props.getAttachedItems(this.props.stickyNote.id);
    }
    
    render(){
        console.log(this.props)
        return <AttachedListDiv> 
                    {this.props.note.slack_items ? 
                        this.props.note.slack_items.map(item => {
                            return <SlackNote
                                parent={this.props.note}
                                key={item.uuid} 
                                item={item} 
                                stickyNote={this.props.stickyNote} />
                    }) :  null}
                    {this.props.note.pocket_items ? 
                        this.props.note.pocket_items.map(item => {
                            return <PocketNote 
                                parent={this.props.note}
                                key={item.item_id} 
                                stickyNote={this.props.stickyNote}
                                item={item} />
                    }) :  null}
            </AttachedListDiv>
    }
}

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    // getAttachedItems,
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