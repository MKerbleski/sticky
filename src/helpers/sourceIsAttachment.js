export const sourceIsAttachment = (sourceObj, targetObj) => {
    const target = targetObj.note
    const source = sourceObj
    const targetParent = targetObj.parent
    // const sourceNoteId = sourceObj.item.permalink
    const sourceParent = sourceObj.parent

    //from note
    let total_items_attached = target.total_items_attached;
    let sticky_items_attached = target.sticky_items_attached;
    let pocket_items_attached = target.pocket_items_attached;
    let source_id;

    if(source.type === "pocket"){
        //from pocket 
        source_id = source.note.item_id
    } else if(source.type === "slack"){
        //from slack
        source_id = source.note.permalink
    }

    console.log("\n ==sharedStickyNoteDrop== \n",
        '\ntarget:',target,
        '\nsource:', source,
        '\nsource_id:', source_id,
        '\ntargetParent:', targetParent,
        '\nsourceParent:', sourceParent,
    )
    
    if(!sourceParent){
        //only add to target
        if(total_items_attached === 0){
            //first item added 
            if(source.type === "pocket"){
                return [{
                    id: target.id,
                    total_items_attached: 1,
                    pocket_items_attached: source_id
                }]
            } else if(source.type === "slack"){
                return [{
                    id: target.id,
                    total_items_attached: 1,
                    slack_items_attached: source_id
                }]
            }
        }
    } else {
        //make sure that it is not being dropped on current parent
        //need to subtract from parent
    }

    // if(target && sourceNoteId === targetNoteId){
    //     console.log("Dropped note on self.")
    //     return null
    // }
    // if(sourceParent && targetNoteId === sourceParent.id){             
    //     console.log("Dropped note on parent.")
    //     return null
    // }
}