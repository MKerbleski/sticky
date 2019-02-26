export const sharedStickyNoteDrop = (props, monitor) => {
    const draggedNote = props.layerOne
    const draggedNoteId = draggedNote.id
    const oldParentNoteId = draggedNote.parent_id

    const newParentNote = monitor.getDropResult()
    const newParentNoteId = newParentNote.targetId
    // const current_note_id = props.layerOne.id;
    // const old_parent_note_id = props.layerOne.parent_id;
    // const drop_result = monitor.getDropResult();
    // const new_parent_id = drop_result.targetId;
    
    if(draggedNoteId !== newParentNote.targetId){
        switch(newParentNote.type){
            case 'top':
                return [{ id: draggedNoteId, parent_id: null }]
            case 'deleteBin':
                return [{ id: draggedNoteId, is_deleted: true }]
            case 'note':
                let old_parent_children = [];
                let new_parent_children = [];
                //set up new parent list
                if(newParentNote.target.children_attached){
                    new_parent_children = newParentNote.target.children_attached + `,${draggedNoteId}`
                } else {
                    new_parent_children = `${draggedNoteId}`
                }
                if(draggedNote.has_parent_note){
                    //incomplete need to modify old_parent_children
                    //incomplete need to modify new_parent_children
                    return [
                        {   id: newParentNote.targetId,
                            children_attached: new_parent_children },
                        {   id: draggedNoteId,
                            has_parent_note: true  },
                        {   id: oldParentNoteId,
                            children_attached: old_parent_children }
                    ]
                } else {
                    return [
                        {   id: newParentNoteId,
                            edit: {
                                children_attached: new_parent_children,
                                has_children: true
                            }},
                        // current child needs the true flag on parent
                        {   id: draggedNoteId,
                            edit: {
                                has_parent_note: true,
                                parent: newParentNoteId 
                            }}
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