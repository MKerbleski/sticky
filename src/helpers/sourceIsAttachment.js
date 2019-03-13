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

    if(targetObj.type === 'note'){
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

        if(source.type === "pocket"){
            if(target.num_pocket_items_attached > 0){
                target.pocket_items_attached+= `,${source_id}`
                return [{
                    id: target.id,
                    num_pocket_items_attached: target.num_pocket_items_attached+=1,
                    pocket_items_attached: target.pocket_items_attached
                }]
            } else {
                return [{
                    id: target.id,
                    num_pocket_items_attached: target.num_pocket_items_attached+=1,
                    pocket_items_attached: source_id
                }]
            }
        } else if(source.type === "slack"){
            if(target.num_slack_items_attached > 0){
                target.slack_items_attached+= `,${source_id}`
                return [{
                    id: target.id,
                    num_slack_items_attached: target.num_slack_items_attached+=1,
                    slack_items_attached: target.slack_items_attached
                }]
            } else {
                return [{
                    id: target.id,
                    num_slack_items_attached: target.num_slack_items_attached+=1,
                    slack_items_attached: source_id
                }]
            }
        }
    } else {
        //make sure that it is not being dropped on current parent
        //need to subtract from parent
        //from note
        if(targetObj.type === "trash"){
            if(source.type === "pocket"){
                let oldParent = removePocketItem(source.parent, source.note.item_id)
                console.log(oldParent)
                return [oldParent]
            } else if( source.type === "slack"){
                let oldParent = removeSlackItem(source.parent, source.note.permalink)
                return [oldParent]
            }
        }   
    }
}

const removeSlackItem = (note, permalink) => {
    let temp =  note.slack_items_attached.split(',')
    console.log(temp)
    let index = temp.indexOf(permalink)
    if(temp.length === 1){
        temp = null
    } else {
        temp.splice(index, 1)
    }
    console.log()
    return {
        id: note.id,
        slack_items_attached: temp ? temp.join(",") : null,
        num_slack_items_attached: note.num_slack_items_attached-=1,
    }
}

const removePocketItem = (note, item_id) => {
    let temp =  note.pocket_items_attached.split(',')
    let index = temp.indexOf(item_id)
    if(temp.length === 1){
        temp = null
    } else {
        temp.splice(index, 1)
    }
    return {
        id: note.id,
        pocket_items_attached: temp ? temp.join(",") : null,
        num_pocket_items_attached: note.num_pocket_items_attached-=1,
    }
}