import React , { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import { 
    SlackNote, 
    PocketNote, 
} from './../index.js';
import { 
    // getAttachedItems,
    // editAttachedItems, 
} from '../../actions'
import { 
    scrollBar,
    border,
    flexCenter
} from '../../styles/styl-utils.js'
import {
    linksBlue
} from '../../styles/colors'


class AttachedList extends Component {
    componentDidMount(){
        // this.props.getAttachedItems(this.props.stickyNote.id);
    }
    
    render(){
        // console.log('note-detailattached', this.props);
        return <AttachedListDiv> 
                    {this.props.note.slack_items 
                        ?   this.props.note.slack_items.map(item => {
                                return <SlackNote
                                    parent={this.props.note}
                                    key={item.uuid} 
                                    item={item} 
                                    stickyNote={this.props.stickyNote} />
                                }) 
                        :   <h1>atta</h1>
                    }
                       
                    {this.props.note.pocket_items 
                        ?   this.props.note.pocket_items.map(item => {
                                return <PocketNote 
                                    parent={this.props.note}
                                    key={item.item_id} 
                                    stickyNote={this.props.stickyNote}
                                    item={item} 
                                />
                            }) 
                        :   <h1>atta</h1>
                    }
            </AttachedListDiv>
    }
}

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    // getAttachedItems,
    // editAttachedItems
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AttachedList)

const AttachedListDiv = styled.div`
    /* border: 1px solid red; */
    color: black;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    /* background: green; */

    /* ${border()} */
    ${scrollBar()}
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    background: ${linksBlue};
    color: white;
    min-width: 30%;
    /* margin: 5px; */
    /* min-height: 98%; */
    .link-source-container{
        margin-bottom: 2px;
        width: 99%;
        overflow: auto; 
    }
`