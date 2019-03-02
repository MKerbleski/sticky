import { noteToNote } from '../actions/index.js'

//must return array
export const sharedStickyNoteDrop = (sourceObj, targetObj) => {
    targetObj = targetObj.getDropResult()

    const target = targetObj.note
    const source = sourceObj.note
    const sourceNoteId = sourceObj.note.id
    const targetParent = targetObj.parent
    const sourceParent = sourceObj.parent
    // const sourceParentId = sourceObj.parent.id
    let sourceParentChildren;
    let targetParentChildren;

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
            console.log('note will be flagged as is_deleted, location will remain stored')
            return [
                {   id: sourceNoteId, 
                    is_deleted: true   }]
        case 'note':
            console.log('target is note')
            const targetNoteId = targetObj.note.id
            let new_parent_children;
            
            //EDGE CASES
            if(target && sourceNoteId === targetNoteId){
                console.log("Dropped note on self.")
                return null
            }
            if(sourceParent && targetNoteId === sourceParent.id){             
                console.log("Dropped note on parent.")
                return null
            }
            //wierd edge but might need to check if already a child
            
            if(target.children_attached){
                new_parent_children = target.children_attached + `,${sourceNoteId}`
            } else {
                new_parent_children = `${sourceNoteId}`
            }

            if(targetParent && sourceParent){
                return [
                    //dragged note
                    {   id: sourceNoteId,
                        has_parent_note: true,
                        parent: targetNoteId  },
                    //new parent
                    {   id: targetNoteId,
                        has_children: true,
                        children_attached: new_parent_children },
                    //old parent
                    {   id: sourceParent.id,
                        has_children: sourceParentChildren.length > 0 ? true : false,
                        children_attached: sourceParentChildren }
                ]
            } else {
                //note has NO parent
                return [
                   //dragged note
                   {   id: sourceNoteId,
                        has_parent_note: true,
                        parent: targetNoteId    },
                    //new parent
                    {   id: targetNoteId,
                        has_children: true,
                        children_attached: new_parent_children    }
                ]
            // } else if (sourceParent && !targetParent){
            //     //target has NO parent
            //     return [
            //         //dragged note
            //         {   id: sourceNoteId,
            //             has_parent_note: true,
            //             parent: targetNoteId    },
            //         //old parent
            //         {   id: sourceParent.id,
            //             has_children: sourceParentChildren.length > 0 ? true : false,
            //             children_attached: sourceParentChildren }
            //     ]
            }
            default: 
                console.log("retured null, there was no type on target object")
                return null
        }
}