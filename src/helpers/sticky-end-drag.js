export const sharedStickyNoteDrop = (props, monitor) => {
    
    const current_note_id = props.layerOne.id;
    const old_parent_note_id = props.layerOne.parent_id;
    const drop_result = monitor.getDropResult();
    const new_parent_id = drop_result.targetId;
    
    if(current_note_id !== new_parent_id){
        switch(drop_result.type){
            case 'top':
                return {id: current_note_id, parent_id: null}
            case 'deleteBin':
                return {id: current_note_id, is_deleted: true}
            case 'note':
                let old_parent_children = [];
                let new_parent_children = [];
                if(props.layerOne.has_parent_note){
                    return [
                        {   id: new_parent_id,
                            children_attached: new_parent_children },
                        {   id: current_note_id,
                            has_parent_note: true  },
                        {   id: old_parent_note_id,
                            children_attached: old_parent_children }
                    ]
                } else {
                    // construct new parent children array include id
                    if(drop_result.target.children_attached){
                        new_parent_children = drop_result.target.children_attached + `,${current_note_id}`
                    } else {
                        new_parent_children = current_note_id
                    }
                    return [
                        {   id: new_parent_id,
                            children_attached: new_parent_children,
                            has_children: true  },
                        // current child needs the true flag on parent
                        {   id: current_note_id,
                            has_parent_note: true,
                            parent: new_parent_id  }
                    ]
                }
            default: 
                console.log("retured null, there was no type on target object")
                return null
        }
    } else {
        return null
    }
}