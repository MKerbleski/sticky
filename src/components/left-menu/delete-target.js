import React from 'react';
import { DropTarget } from 'react-dnd';

const DeleteTarget = (props) => (
  props.connectDropTarget(
    <div
      className="menu-item"
      style={{
        // height: props.highlighted ? "200px" : null,
        background: props.highlighted ? "red" : null,
        textDecoration: "none",
        cursor: "default"
      }}
      >
      <i className=" menu-item fas fa-trash-alt"></i>
    </div>
  )
);

const specObj = {
	hover(props, component){
		// console.log(props)
	},

	drop(props) {
		// const target_type = props.type;
		return ({
			target_type: 'deleteBin',
		});
	}
}

const collect = (connect,  monitor) => ({
	connectDropTarget: connect.dropTarget(),
	highlighted: monitor.canDrop(),
});

export default DropTarget('item', specObj, collect)(DeleteTarget);