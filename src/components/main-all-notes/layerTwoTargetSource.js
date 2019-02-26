import styled from 'styled-components';
import React from 'react';
import { DragSource, DropTarget, } from 'react-dnd';
import flow from 'lodash/flow'
import { LayerThreeSource } from "./index"
import { sharedStickyNoteDrop } from '../../helpers'
import { editNote } from '../../actions'
import { connect } from 'react-redux'

class LayerTwoTargetSource extends React.Component {
    
    goToNote = (e) => {
        e.stopPropagation();
        this.props.redirect(`/${this.props.layerTwo.sticky_user_id}/note/${this.props.layerTwo.id}`)
    }

    render(){
        const {
            connectDragSource, 
            connectDropTarget, 
        } = this.props

        if (this.props.layerTwo){
            return (
                connectDragSource &&
                connectDropTarget &&
                    <LayerTwoDiv 
                        innerRef={instance => {
                            this.props.connectDragSource(instance);
                            this.props.connectDropTarget(instance);}}
                        type="note"
                        onClick={this.goToNote}
                        style={{background: this.props.hover ? 'lightgreen' : null}}>
                        <h4>{this.props.getFirstWord(this.props.layerTwo.text_body)}</h4>
                        <div className="layerThreeContainerAll">
                            {this.props.allNotes.map(layerThree => {
                                if (layerThree.parent_id === this.props.layerTwo.id){
                                    return (
                                        <div 
                                            className="layerThreeContainer" 
                                            key={layerThree.id} >
                                            <LayerThreeSource 
                                                type="note"
                                                changeParent={this.props.changeParent} layerThree={layerThree} 
                                                redirect={this.props.redirect}
                                                // onDrop={this.props.onDrop}
                                                getFirstWord={this.props.getFirstWord}
                                                />
                                        </div>
                                    )
                                } else {
                                    return null
                                }
                            })}
                        </div>                       
                    </LayerTwoDiv>       
                )
        } else {
            return (null)
        }
    }
}

const targetObj = {
    drop(props) {
        const targetId = props.layerTwo.id;
        const type = props.type
        const pocket_items_attached = props.layerTwo.pocket_items_attached;
        const slack_items_attached = props.layerTwo.slack_items_attached;
        return ({
            targetId,
            type,
            slack_items_attached,
            pocket_items_attached,
        });
    }
}

const sourceObj = {
    beginDrag(props) {
        const sourceId = props.layerTwo
        return ({
            sourceId
        });
    },

    endDrag(props, monitor) {
        if(!monitor.didDrop()){
            return ;
        }
        // const sourceId = props.layerTwo.id;
        // const dropResult = monitor.getDropResult({shallow: true}); 

        const sticky_source_id = props.layerTwo.id;
        const target = monitor.getDropResult({shallow: true});
        const target_id = target.targetId;
        let noteEdit = sharedStickyNoteDrop(sticky_source_id, target_id, target);
        props.editNote(noteEdit)
    }
};

const mapStateToProps = store => {
    return {store: store};
  }
  
  const mapDispatchToProps = {
    editNote,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(flow(

    DropTarget('item', targetObj, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        highlighted: monitor.canDrop(),
        hover: monitor.isOver(),
        hoverShallow: monitor.isOver({shallow: true})
    })), 

    DragSource('item', sourceObj, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))

)(LayerTwoTargetSource));

const LayerTwoDiv = styled.div`
    border: 2px solid black;
    border-radius: 20px;
    margin: 10px;
    padding: 10px;
    ${'' /* height: 90px; */}
    background: wheat;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: flex-start;
    overflow: visible;
    h4 {
        ${'' /* border: 1px solid orange; */}
        margin: 0px;
    }
    .layerThreeContainerAll{
        ${'' /* border: 1px solid red; */}
        ${'' /* border: 1px solid green; */}
        ${'' /* height: 500px; */}
        ${'' /* background: gray; */}
        ${'' /* height: 90px; */}
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: space-around;
        ${'' /* overflow: hidden; */}
        .layerThreeContainer{
            ${'' /* border: 1px solid red; */}
            height: 25px;
        }
    }
`;