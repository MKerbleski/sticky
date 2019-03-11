export const sourceIsAttachment = (sourceObj, targetObj) => {
    
    const target = targetObj.note
    const source = sourceObj
    const targetParent = targetObj.parent
    const sourceParent = sourceObj.parent
    // const sourceNoteId = sourceObj.item.permalink
    let total_items_attached;
    let sticky_items_attached;
    let pocket_items_attached;
    let source_id;

    if(target){
        total_items_attached = target.total_items_attached;
        sticky_items_attached = target.sticky_items_attached;
        pocket_items_attached = target.pocket_items_attached;
    }
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
        if(targetObj.type === "trash"){
            alert('cannot do that, yet')
            return null
        }  
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
        } else {
            //there are items on the target already
            if(source.type === "pocket"){
                pocket_items_attached+= `,${source_id}`
                return [{
                    id: target.id,
                    total_items_attached: total_items_attached+=1,
                    pocket_items_attached: pocket_items_attached
                }]
            } else if(source.type === "slack"){
                
            }
        }
    } else {
        //make sure that it is not being dropped on current parent
        //need to subtract from parent
        //from note
        if(targetObj.type === "trash"){
            if(source.type === "pocket"){
                let oldParent = removePocketItem(source.parent, source.note.item_id)
                return [oldParent]
            } else if( source.type === "slack"){
                let oldParent = removeSlackItem(source.parent, source.note.item_id)
                return [oldParent]
            }
        }   
    }
}

const removeSlackItem = (note, permalink) => {
    let temp = note.slack_items_attached.split(',')
    return {
        id: note.id,
        slack_items_attached: temp.splice(temp.indexOf(permalink), 1),
        total_items_attached: note.total_items_attached-= 1,
    }
}
const removePocketItem = (note, item_id) => {
    let temp = note.pocket_items_attached.split(',')
    return {
        id: note.id,
        pocket_items_attached: temp.splice(temp.indexOf(item_id), 1),
        total_items_attached: note.total_items_attached-= 1,
    }
}