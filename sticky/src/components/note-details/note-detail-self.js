import React from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import { start } from '../../styles/styl-utils.js'
import { NoteDetailChild } from '../index.js';
import { connect } from 'react-redux';

import SlackNote from '../slack-note.js'
import PocketNote from '../pocket-note.js'
import NoteDetailBody from './note-detail-body.js';
import { getAttachedItems } from '../../actions'

class NoteDetailSelf extends React.Component {
    componentDidMount(){
        console.log("CDM",this.props.note.id);
        this.props.getAttachedItems(this.props.note.id);
    }

    render(){
        console.log(this.props)
        return (
            this.props.connectDropTarget(
                <div className="note-detail-self-container">{/* THIS IS ON PREVIOUS COMPONENT */}
                    {(this.props.note) ?
                      (<NoteDetailSelfDiv 
                            color={this.props.note.note_color}
                            className="note-detail" 
                            style={{background: this.props.hover ? 'lightgreen' : null}}
                        >
                          <div className="note-detail-main">
                            <div className="note-detail-left">
                              <NoteDetailBody editNote={this.props.editNote} note={this.props.note} />
                              <div className="note-detail-children">
                                {this.props.allNotes.map( layerOne => {
                                    if(layerOne.parent_id === this.props.note.id){
                                        return (
                                            <NoteDetailChild
                                                type="note"
                                                onDrop={this.props.onDrop}
                                                changeParent={this.props.changeParent}
                                                key={layerOne.id}
                                                layerOne={layerOne}
                                                allNotes={this.props.allNotes}
                                                color={layerOne.note_color}
                                            />
                                        )
                                    } else {
                                        return null
                                    }
                                })}{/* map */}
                              </div>{/* noted-detail-children */}
                            </div>{/* note-detail-left */}
                            <div className="note-detail-right">
                                {this.props.allLinks ? 
                                    <React.Fragment>
                                    <div>
                                        
                                      <h5>slack links</h5>
                                      {this.props.allLinks.map(link => {
                                        if (+link.parent_id === +this.props.note.id){
                                            return (
                                              <div  
                                                key={link.id} 
                                                className="link-source-container">
                                                  <SlackNote 
                                                      link={link} 
                                                      type='note'
                                                      onDrop={this.props.onDrop}>
                                                      text: {link.slack_text}
                                                  </SlackNote>
                                              </div>)
                                        } else {
                                          return null
                                        }
                                      })}{/* map */}
                                    </div>
                                    <div>

                                      {this.props.store.notes.attachedItems ? this.props.store.notes.attachedItems.map(item => {
                                          return (
                                              <PocketNote key={item.id} pocketItem={item} />
                                          )
                                      }) :  null}
                                    </div>
                                    </React.Fragment>
                                : <p>no links associated with this note</p>}
                            </div>{/* note-detail-right */}
                          </div>{/* note-detail-main */}
            
                          <div className="note-detail-settings">
                              <i className="fas fa-cogs"></i>
                          </div>{/* note-detail-settings */}
                      </NoteDetailSelfDiv>
                    ) :
                    null}
                  </div>
              )
        )
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
        // console.log('target props', props, hover)
        const { type, targetId } = props;
        const pocket_items_attached = props.note.pocket_items_attached;
        const slack_items_attached = props.note.slack_items_attached;
        return ({
            type, targetId, pocket_items_attached, slack_items_attached
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
    getAttachedItems
}

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget('item', targetObj, collect)(NoteDetailSelf));


const NoteDetailSelfDiv = styled.div`
  ${start('red')}
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: ${props => props.color};
  ${'' /* above is for custom colors. below is a placeholder until I can figure out how to make them look good and custom */}
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
            .note-detail-child-container{
                  ${'' /* this class is on the next page */}
                  ${start('blue')}
                  ${'' /* background: black; */}
                  min-width: 24%;
                  margin: 0 3px;
            }
          }
      }
      .note-detail-right{
          ${start('red')}
          flex-direction: column;
          background: skyblue;
          color: white;
          width: 30%;
          margin: 5px;
          overflow: auto;
          height: 99%;
          .link-source-container{
            ${'' /* border: 1px solid green; */}
            ${'' /* height: 100px; */}
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