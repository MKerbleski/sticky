import React , { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import { 
    SlackNote, 
    PocketNote, 
} from './../index.js';
import { 
    getAttachedItems,
    attachPocketItem, 
} from '../../actions'

class AttachedList extends Component {
    render(){
        return (
        <AttachedListDiv> 
            {this.props.store.notes.attachedItems ? 
            this.props.store.notes.attachedItems.map(item => {
               if(item.slack_user_id){
                   return (
                       <SlackNote attachPocketItem={this.props.attachPocketItem} key={item.uuid} note={item} />
                   )
               } else {
                   return (
                       <PocketNote key={item.id} attachPocketItem={this.props.attachPocketItem} pocketItem={item} />
                   )
               }
           }) :  null}
       </AttachedListDiv>)
    }
}

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    getAttachedItems,
    attachPocketItem
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AttachedList)

const AttachedListDiv = styled.div`
    border: 1px solid red;
    color: black;
    background: green;
`