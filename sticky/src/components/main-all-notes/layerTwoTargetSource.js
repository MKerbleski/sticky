import styled from 'styled-components';
import React from 'react';
import { DragSource, DropTarget, } from 'react-dnd';
import flow from 'lodash/flow'

import { LayerThreeSource } from "./index"

const targetObj = {
    drop(props) {
        const targetId = props.layerTwo.id;
        const type = props.type
        return ({
            targetId, type
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
        const sourceId = props.layerTwo.id;
        const dropResult = monitor.getDropResult({shallow: true});
        props.onDrop(sourceId, dropResult.type, dropResult.targetId);
    }
};

class LayerTwoTargetSource extends React.Component {
    goToNote = () => {
        // console.log('layer two go to note')
        this.props.redirect(`/note/${this.props.layerTwo.id}`)
    }
    render(props){
        // console.log(this.props)
        const {
            connectDragSource, 
            connectDropTarget, 
        } = this.props

        if (this.props.layerTwo){
            return (
                connectDragSource &&
                connectDropTarget &&
                connectDragSource(
                connectDropTarget(
                    <div onClick={(e) => {e.stopPropagation();}}>

                    <LayerTwoDiv 
                            type="note"
                            onClick={this.goToNote}
                            style={{background: this.props.hover ? 'lightgreen' : null}}>
                            {/* <h3>{this.props.layerTwo.title}</h3> */}
                            
                            <h4>{this.props.getFirstWord(this.props.layerTwo.textBody)}</h4>
                            <div className="layerThreeContainerAll">
                               {this.props.allNotes.map(layerThree => {
                                    if (layerThree.parent_id === this.props.layerTwo.id){
                                        return (
                                            <div className="layerThreeContainer" key={layerThree.id} >
                                                <LayerThreeSource 
                                                    type="note"
                                                    changeParent={this.props.changeParent} layerThree={layerThree} 
                                                    redirect={this.props.redirect}
                                                    onDrop={this.props.onDrop}
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
                    </div>
                    )
                    )
                )
        } else {
            return (null)
        }
    }
}

export default flow(

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

)(LayerTwoTargetSource);

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