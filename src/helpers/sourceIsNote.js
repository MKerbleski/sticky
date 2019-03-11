export const sourceIsNote = (sourceObj, targetObj) => {
    const target = targetObj.note
    const source = sourceObj.note
    const sourceNoteId = sourceObj.note.id
    const targetParent = targetObj.parent
    const sourceParent = sourceObj.parent
    // const sourceParentId = sourceObj.parent.id
    let sourceParentChildren;
    
    if(sourceParent){
        console.log(sourceParent)
        if(sourceParent.children.length === 1){
            sourceParentChildren = null
            console.log(sourceParentChildren)
        } else {
            sourceParentChildren = sourceParent.children_attached.split(',')
            console.log(sourceParentChildren)
            sourceParentChildren = sourceParentChildren.filter(noteId => {
                return parseInt(noteId, 10) !== sourceNoteId
            })
            console.log(sourceParentChildren)
            sourceParentChildren = sourceParentChildren.join(',')
            console.log(sourceParentChildren)
        }
    } else {
        console.log("Note has no parent.")
        sourceParentChildren = null
    }

    console.log("\n ==sharedStickyNoteDrop== \n",
        '\ntarget:',target,
        '\nsource:', source,
        '\ntargetParent:', targetParent,
        '\nsourceParent:', sourceParent,
        '\nsourceParentChildren:', sourceParentChildren,
    )

    switch(targetObj.type){
        case 'top':
            console.log('target is top')
            if(sourceParent){
                console.log("note will be moved to top")
                return [
                    {   id: sourceNoteId,
                        has_parent_note: false,
                        parent: null     },
                    {   id: sourceParent.id,
                        has_children: sourceParentChildren ? true : false, 
                        children_attached: sourceParentChildren  }]
            } else {
                console.log("note is already at top")
                return null
            }
        case 'trash':
            console.log('target is trash')
            console.log('note will be flagged as is_deleted, but it will remain a child on its parent, for resoreability until permenantly deleted')
            return [
                {   id: sourceNoteId, 
                    is_deleted: true   }]
        case 'note':
            console.log('target is note')
            const targetNoteId = targetObj.note.id
            let targetParentChildren;
            
            //EDGE CASES
            if(target && sourceNoteId === targetNoteId){
                console.log("Dropped note on self.")
                return null
            }
            if(sourceParent && targetNoteId === sourceParent.id){             
                console.log("Dropped note on parent.")
                return null
            }
            //wierd edge but might need to check if already listed as child on targetNote
            
            if(target.children_attached){
                targetParentChildren = target.children_attached + `,${sourceNoteId}`
            } else {
                targetParentChildren = `${sourceNoteId}`
            }

            if(sourceParent){
                // window.alert('1')
                return [
                    //dragged note
                    {   id: sourceNoteId,
                        has_parent_note: true,
                        parent: targetNoteId  },
                        //new parent
                    {   id: targetNoteId,
                        has_children: true,
                        children_attached: targetParentChildren },
                    //old parent
                    {   id: sourceParent.id,
                        has_children: sourceParentChildren &&sourceParentChildren.length > 0 ? true : false,
                        children_attached: sourceParentChildren }]
            }  else {
                // window.alert('2')
                //note with no parent note to a note with a parent note
                return [
                //dragged note
                    {   id: sourceNoteId,
                            has_parent_note: true,
                            parent: targetNoteId    },
                    //new parent
                    {   id: targetNoteId,
                        has_children: true,
                        children_attached: targetParentChildren    }
                ]
            } 
            default: 
                console.log("retured null, there was no type on target object")
                return null
    }
}