export const sourceIsAttachment = (sourceObj, targetObj) => {
    
    const target = targetObj.note
    const source = sourceObj
    const targetParent = targetObj.parent
    const sourceParent = sourceObj.parent
    // const sourceNoteId = sourceObj.item.permalink
    let source_id;
 
    if(source.type === "pocket"){
        //from pocket 
        source_id = source.note.item_id
    } else if(source.type === "slack"){
        //from slack
        source_id = source.note.permalink
    }

    console.log("\n ==sharedStickyNoteDrop== \n",
        '\ntarget:', target,
        '\ntargetObj:', targetObj,
        '\nsourceObj:', sourceObj,
        '\nsource:', source,
        '\nsource_id:', source_id,
        '\ntargetParent:', targetParent,
        '\nsourceParent:', sourceParent,
    )
    
    if(!sourceParent){
        //only add to target
        if(targetObj.type === "trash"){
            alert('cannot do that, yet')
            return [null]
        }
        if(source.type === "pocket"){
            if(targetObj.type === "note"){
                //came from pocket list
                console.log('source_id', source_id)
                let newParent = addPocketItem(target, source_id)
                return [newParent, {api: 'pocket', item_id: source_id, is_attached: true}]
            }
        } else if(source.type === "slack"){
            let newParent = addSlackItem(target, source_id)
            return [newParent]
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
                let oldParent = removeSlackItem(source.parent, source.note.permalink)
                return [oldParent]
            }
        } else if (targetObj.type === "note"){
            //note -> note  
            if(source.type === "pocket"){
                let oldParent = removePocketItem(source.parent, source.note.item_id)
                let newParent = addPocketItem(target, source.note.item_id)
                console.log(oldParent, newParent)
                return [oldParent, newParent]
            } else if (source.type === "slack"){
                let oldParent = removeSlackItem(source.parent, source.note.item_id)
                let newParent = addSlackItem(target, source.note.permalink)
                console.log(oldParent, newParent)
                return [oldParent, newParent]
            }
        } else if (targetObj.type === "top"){
            window.alert("cannot do that, yet. try deleting")
            return [null]
        }
    }
}

const addPocketItem = (note, item_id) => {
    if(note.num_pocket_items_attached > 0){
        if(note.pocket_items_attached.split(',').includes(item_id)){
            window.alert('item is already attached')
            return null
        } else {
            //continue
            note.pocket_items_attached+= `,${item_id}`
            return {
                id: note.id,
                num_pocket_items_attached: note.num_pocket_items_attached+=1,
                pocket_items_attached: note.pocket_items_attached
            }
        }
    } else {
        return {
            id: note.id,
            num_pocket_items_attached: note.num_pocket_items_attached+=1,
            pocket_items_attached: item_id
        }
    }
}
const addSlackItem = (note, permalink) => {
    
    if(note.num_slack_items_attached > 0){
        if(note.slack_items_attached.split(',').includes(permalink)){
            window.alert('item is already attached')
            return null
        } else {
            //continue
            note.slack_items_attached+= `,${permalink}`
            return {
                id: note.id,
                num_slack_items_attached: note.num_slack_items_attached+=1,
                slack_items_attached: note.slack_items_attached
            }
        }
    } else {
        return {
            id: note.id,
            num_slack_items_attached: note.num_slack_items_attached+=1,
            slack_items_attached: permalink
        }
    }
}

const removeSlackItem = (note, permalink) => {
    let temp =  note.slack_items_attached.split(',')
    let index = temp.indexOf(permalink)
    if(temp.length === 1){
        temp = null
    } else {
        temp.splice(index, 1)
    }
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