import { editAttachedItems } from '../actions/index.js'

export const sharedEndDrag = (props, monitor, type) => {
    console.log("sharedEndDrag props:", props)
    if(!monitor.didDrop()){
        return;
    }
    const item_id = props.item.id;
    const target_info = monitor.getDropResult();
    let parentStickyNote = props.stickyNote;
    console.log("target_info", target_info)
    const removeAttachment = () => {
        console.log("remove Attachment", parentStickyNote.total_items_attached)
        let total_items_attached = parentStickyNote.total_items_attached
        if(total_items_attached === 1){
            let noteEdit = {[type]: 0}
            editAttachedItems(noteEdit, parentStickyNote.id)
        } else {
            let tempArr = parentStickyNote[type].join(',')
            let index = tempArr.indexOf(item_id)
            if(index > -1){
                tempArr.splice(index, 1)
            }
            if(total_items_attached > 0){
                total_items_attached--
            } else {
                total_items_attached = 0
            }
            let newStr = tempArr.toString()
            let noteEdit = {[type]: newStr, total_items_attached: total_items_attached}
            console.log("removeAttachment", noteEdit)
            editAttachedItems(noteEdit, parentStickyNote.id) 
        }
    }    

    if(target_info.type === "deleteBin"){
    let parentStickyNote = props.stickyNote;
        removeAttachment(parentStickyNote)
    } else if (target_info.type === "note") { 
        //check if note is parent
        // if(target_info.)
        let total_items_attached = target_info.total_items_attached
        const sticky_note_id = target_info.targetId
        let list = target_info[type]
        console.log(list)
        if(!list){
            console.log("NO EXISTING LIST")
            let noteEdit = {[type]: `${item_id}`, total_items_attached: 1}
            if(parentStickyNote){
                console.log("came from another note", props.stickyNote)
                removeAttachment()
                let parent_id = props.stickyNote.id
                return {noteEdit, sticky_note_id, parent_id }
                // editAttachedItems(noteEdit, sticky_note_id, props.stickyNote.id)
            } else {
                console.log("came from right menu")
                return {noteEdit, sticky_note_id, }
                // editAttachedItems(noteEdit, sticky_note_id)
            }
        } else {
            let repeat = 0;
            if(list && list.length > 0){
                let tempArr = list.split(',');
                repeat = tempArr.filter(note => {
                    return +note === item_id
                })
                if(repeat.length > 0){
                    console.log("REPEAT no action taken, alert needed")
                    window.alert("Item is already attached to this note. No duplicate notes")
                } else {
                    total_items_attached++
                    let newAttached = tempArr + `,${item_id}`
                    let noteEdit = {[type]: newAttached, total_items_attached: total_items_attached}
                    if(props.stickyNote){
                        console.log("came from another note", props.stickyNote)
                        removeAttachment()
                        editAttachedItems(noteEdit, sticky_note_id, props.stickyNote.id)
                    } else {
                        editAttachedItems(noteEdit, sticky_note_id)
                    }
                }
            }
        }
    }
}

