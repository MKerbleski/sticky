import React , { Component } from 'react'
import styled from 'styled-components'

import { 
    SlackNote, 
    PocketNote, 
} from '../index.js';

import { 
    scrollBar,
    border,
    linksBlue
} from '../../styles'

class NoteDetailAttachedList extends Component {    
    render(){
        return <NoteDetailAttachedListDiv> 
                    {this.props.note.slack_items 
                        ?   this.props.note.slack_items.map(item => {
                                return <SlackNote
                                    parent={this.props.note}
                                    key={item.uuid} 
                                    item={item} 
                                    stickyNote={this.props.stickyNote} />
                                }) 
                        :   null
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
                        :   null
                    }
            </NoteDetailAttachedListDiv>
    }
}

export default NoteDetailAttachedList

const NoteDetailAttachedListDiv = styled.div`
    /* ${border()} */
    ${scrollBar()}
    box-sizing: border-box;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 5px;
    border: 1px solid gray;
    background: rgba(1,1,1,.05);
    min-width: 30%;
`