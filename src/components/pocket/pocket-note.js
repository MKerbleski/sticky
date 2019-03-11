import styled from 'styled-components';
import React from 'react';
import { DragSource } from 'react-dnd';
import { apiNote } from '../../styles/styl-utils'
import { sharedEndDrag } from '../../helpers/api-end-drag'
import { sharedStickyNoteDrop } from '../../helpers'
import { editAttachedItems } from '../../actions'
import { connect } from 'react-redux';
import format from 'date-fns/format'

const PocketNote = (props) => {
    let time = +props.item.time_added*1000
    time = format(time, 'MMM Do YYYY')
    if(props.item){
        return <PocketNoteDiv 
                    innerRef={instance => props.connectDragSource(instance)}
                    type="pocket" 
                    style={{
                        opacity: props.isDragging ? '0.25' : '1',
                        border: props.isDragging ? '1px dashed gray': '1px solid black'}}
                >
                    <div className="pocket-note-text">
                        {props.item.given_title === "" ? <p>{props.item.resolved_title}</p> : <p>{props.item.given_title}</p>}
                    </div> 
                    <span className="pocket-note-bottom">
                        <p className="pocket-time">{time}</p>
                        <a className="pocket-note-link" target="_blank" href={props.item.given_url}>Link</a>
                    </span>
                </PocketNoteDiv>
    } else {
        return null
    }
 }

 const sourceObj = {
    
    beginDrag(props) {
        const item = props.item;
		const parent = props.parent
		return ({
			type: 'attachment',
			parent: parent,
			item: item,
		});
    },
    
    endDrag(props, monitor) {
        const item = props.item;
		const parent = props.parent
		const source = {
			type: 'attachment',
			parent: parent,
			item: item,
		}

		let noteEdit = sharedStickyNoteDrop(source, monitor);
    },
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    // didDrop: monitor.didDrop(),
});

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    editAttachedItems
}

export default connect(mapStateToProps, mapDispatchToProps)(DragSource('item', sourceObj, collect)(PocketNote));

const PocketNoteDiv = styled.div`
    ${apiNote()}
    background: lightpink;
    .pocket-note-text{
         /* border: 1px solid green; */
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        overflow: hidden;
        margin-bottom: 2px;
    }
    .pocket-note-bottom{
        /* border: 1px solid red; */
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .pocket-note-link{
            /* border: 1px solid red; */
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: flex-end;
        }
    }
`;
