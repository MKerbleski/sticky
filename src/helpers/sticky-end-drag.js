export const sharedStickyNoteDrop = (props, monitor) => {
    
    //must return array

    console.log(props)
    const draggedNote = props.note
    const target = monitor.getDropResult()
    
    const draggedNoteId = draggedNote.id
    const oldParent = props.parent
    
    let old_parent_children;

    console.log("sharedStickyNoteDrop", target, props)
    
    
    if(oldParent){
        console.log(oldParent)
        if(oldParent.children_attached.length === 1){
            old_parent_children = null
            console.log(old_parent_children)
        } else {
            old_parent_children = oldParent.children_attached.split(',')
            old_parent_children = old_parent_children.filter(noteId => {
                return parseInt(noteId, 10) !== draggedNoteId
            })
            old_parent_children = old_parent_children.join(',')
            console.log(old_parent_children)
        }
    } else {
        console.log(oldParent)
    }
    
    if(draggedNoteId !== target.targetId){
        switch(target.target_type){
            case 'top':
                if(oldParent){
                    return [
                        {   id: draggedNoteId,
                            has_parent_note: false,
                            parent: null     },
                        {   id: oldParent.id,
                            has_children: old_parent_children ? true : false, 
                            children_attached: old_parent_children  }]

                } else {
                    return "do nothing"
                }
            case 'deleteBin':
                return [
                    {   id: draggedNoteId, 
                        is_deleted: true,
                        // has_parent_note: false,
                        // parent: null
                    }]
            case 'note':
                const targetId = target.note.id
                if(targetId === draggedNoteId){
                    return "do nothing"
                }
                if(target.note.id === draggedNoteId){
                    return "do nothing"
                }
                let new_parent_children = [];
                //set up new parent list
                if(target.note.children_attached){
                    new_parent_children = target.note.children_attached + `,${draggedNoteId}`
                } else {
                    new_parent_children = `${draggedNoteId}`
                }
                
                
                
                if(draggedNote.has_parent_note){
                    //incomplete need to modify old_parent_children
                    //incomplete need to modify new_parent_children
                    const oldParentNoteId = oldParent.id
                    return [
                        {   id: target.note.id,
                            children_attached: new_parent_children },
                        {   id: draggedNoteId,
                            has_parent_note: true  },
                        {   id: oldParent.id,
                            children_attached: old_parent_children }
                    ]
                } else {
                    return [
                        {   id: targetId,
                            children_attached: new_parent_children,
                            has_children: true  },
                        // current child needs the true flag on parent
                        {   id: draggedNoteId,
                            has_parent_note: true,
                            parent: targetId    }
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