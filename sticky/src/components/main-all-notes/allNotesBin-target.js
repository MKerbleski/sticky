import React from 'react';
import { DropTarget } from 'react-dnd';
import { 
    NotePreviewNew, 
    NotePreview } from './index';

class AllNotesBin extends React.Component {
    render(){
        return(
            this.props.connectDropTarget(
                <div className="all-notes" 
                 style={{background: this.props.hover ? 'lightgreen' : null}}>
                    {this.props.showNewNote ? <NotePreviewNew newNote={this.props.newNote} /> : null}        
                    {this.props.allNotes.map( layerOne => {
                    if(layerOne.parent_id === null){
                        if(layerOne.isLink === 0){
                            return <NotePreview
                                        type="note"
                                        onDrop={this.props.onDrop}
                                        changeParent={this.props.changeParent}
                                        key={layerOne.id}
                                        layerOne={layerOne}
                                        allNotes={this.props.allNotes}
                                        redirect={this.props.redirect}
                                        allLinks={this.props.allLinks.filter(link => {
                                            return (
                                                +link.parent_id === +layerOne.id
                                            )//returns links only liked to parent
                                        })}
                                    />
                        } else {
                            return <p>link</p>
                        }
                    } else {
                        return null
                        }
                    })}
                </div>
              )
        )
    }
}

// const AllNotesBin = (props) => (
//   props.connectDropTarget(
//     <div className="all-notes" 
//      style={{background: props.hover ? 'lightgreen' : null}}>
//         {props.showNewNote ? <NotePreviewNew newNote={props.newNote} /> : null}        
//         {props.allNotes.map( layerOne => {
//         if(layerOne.parent_id === null){
//             if(layerOne.isLink === 0){
//                 return <NotePreview
//                             type="note"
//                             onDrop={props.onDrop}
//                             changeParent={props.changeParent}
//                             key={layerOne.id}
//                             layerOne={layerOne}
//                             allNotes={props.allNotes}
//                             redirect={props.redirect}
//                             allLinks={props.allLinks.filter(link => {
//                                 return (
//                                     +link.parent_id === +layerOne.id
//                                 )//returns links only liked to parent
//                             })}
//                         />
//             } else {
//                 return <p>link</p>
//             }
//         } else {
//             return null
//             }
//         })}
//     </div>
//   )
// );

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

export default DropTarget('item', targetObj, collect)(AllNotesBin);