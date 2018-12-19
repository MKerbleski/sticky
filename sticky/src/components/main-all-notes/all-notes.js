import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { 
  // AllNotesBin,
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
      this.props.getLinks();
      this.props.getNotes();
    } else {
      this.props.history.push('/welcome/login')
    }
  }

  // -----------------------------this can probably be deleted and merged with all Notes Bin- target--------------------------------------------------//
  render(props) {    
    // console.log(this.props)
    return (
        <AllNotesDiv innerRef={instance => this.props.connectDropTarget(instance)}>
          <div 
            className="all-notes" 
            style={{background: this.props.hover ? 'lightgreen' : null}}>
              {this.props.showNewNote ? <NotePreviewNew /> : null}        
              {this.props.store.notes.notes.map(layerOne => {
                if(layerOne.parent_id === null){
                    if(layerOne.isLink === 0){
                        return <NotePreview
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
                    } else {
                        return <p>link</p>
                    }
                } else {
                    return null
                    }
              })}
          </div>
        </AllNotesDiv>
      )
  }
}

const targetObj = {
  hover(props, component){
      if(props.hoverShallow){
        //   console.log('hoverShallow')
      }
  },

  drop(props, monitor) {
    const hover = monitor.isOver({shallow:false})
    
    if(hover){
        // console.log('target props', props, hover)
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
${'' /* border: 1px solid green; */}
  display: flex;
  flex-direction: column;
  padding: 15px;
  ${'' /* background-color: #2a465c; */}
  color: black;
  overflow: auto;
  .all-notes {
    ${'' /* border: 1px solid blue; */}
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    padding: 20px;
    ${'' /* height: 100%; */}
    .note-link{
      text-decoration: none;
    }
  }
`;