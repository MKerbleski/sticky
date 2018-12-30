import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { 
  NotePreviewNew,
  NotePreview } from './index';
import { 
  getLinks,
  getNotes, } from '../../actions'

class AllNotes extends Component {
  constructor(props){
    super(props);
    this.state = {
      stateNotes: false,
      notes: [],
    }
  }

  componentDidMount(){
    if(localStorage.getItem('JWT')){
      // this.props.getLinks();
      this.props.getNotes();
    } else {
      this.props.history.push('/welcome/login')
    }
  }

  render(props) {    
    // console.log(this.props.store.notes.notes.length)
    return (
        <AllNotesDiv innerRef={instance => this.props.connectDropTarget(instance)}
        style={{background: this.props.hover ? 'lightgreen' : null}}>
              {this.props.store.notes.notes.length > 0 ? null :
                <div>
                  <h3>Welcome!</h3>
                  <p>Click the plus to the left to create a new note</p>
                </div> }
              {this.props.showNewNote ? <NotePreviewNew toggleNewNote={this.props.toggleNewNote} /> : null}        
              {this.props.store.notes.notes.map(layerOne => {
                  if(layerOne.parent_id === null){
                          return (
                            <NotePreview
                                type="note"
                                onDrop={this.props.onDrop}
                                changeParent={this.props.changeParent}
                                key={layerOne.id}
                                layerOne={layerOne}
                                allNotes={this.props.store.notes.notes}
                                redirect={this.props.redirect}
                                // allLinks={this.props.allLinks.filter(link => {
                                //     return (
                                //         +link.parent_id === +layerOne.id
                                //     )//returns links only liked to parent
                                // })} 
                                />
                          )
                  } else {
                      return null
                      }
              })}
        </AllNotesDiv>
      )
  }
}

const targetObj = {
  hover(props, component){
      if(props.hoverShallow){
      }
  },

  drop(props, monitor) {
    const hover = monitor.isOver({shallow:false})
    if(hover){
        const { type } = props;
        return ({
            type,
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
  getLinks,
  getNotes,
}

export default DropTarget('item', targetObj, collect)(connect(mapStateToProps, mapDispatchToProps)(AllNotes))

const AllNotesDiv = styled.div`
    /* border: 1px solid green; */
    color: black;
    overflow: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    padding: 20px;
    &::-webkit-scrollbar {
        width: 6px;
        &-thumb{
            background-color: gray;
            border-radius: 25px;
        }
    }
`;