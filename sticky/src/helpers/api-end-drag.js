export const sharedEndDrag = (props, monitor) => {
    if(!monitor.didDrop()){
        return;
    }
    const slack_item_id = props.slackItem.id;
    const target_info = monitor.getDropResult();   
    const removeAttachment = () => {
        let tempArr = props.store.notes.attachedItems.map(obj => {
            return obj.id
        })
        let total_items_attached = stickyNote.total_items_attached
        if(tempArr.length === 1){
            let noteEdit = {slack_items_attached: null}
            props.attachPocketItem(noteEdit, stickyNote.id)
        } else {
            let index = tempArr.indexOf(slack_item_id)
            if(index > -1){
                tempArr.splice(index, 1)
            }
            if(total_items_attached > 0){
                total_items_attached--
            } else {
                total_items_attached = 0
            }
            let newStr = tempArr.toString()
            let noteEdit = {slack_items_attached: newStr, total_items_attached: total_items_attached}
            console.log("removeAttachment", noteEdit)
            props.attachPocketItem(noteEdit, stickyNote.id) 
        }
    }    
    let stickyNote = props.stickyNote;
    if(target_info.type === "deleteBin"){
        removeAttachment()
    } else if (target_info.type === "note") { 
        //check if note is parent
        let total_items_attached = target_info.total_items_attached
        const sticky_note_id = target_info.targetId
        let slack_items_attached = target_info.slack_items_attached
        if(!slack_items_attached){
            console.log("NO slack_items_attached")
            let noteEdit = {slack_items_attached: `${slack_item_id}`, total_items_attached: 1}
            props.attachPocketItem(noteEdit, sticky_note_id)
            if(props.stickyNote){
                console.log("came from another note", props.stickyNote)
                removeAttachment()
                props.attachPocketItem(noteEdit, sticky_note_id, props.stickyNote.id)
            } else {
                props.attachPocketItem(noteEdit, sticky_note_id)
            }
        } else {
            let repeat = 0;
            if(slack_items_attached && slack_items_attached.length > 0){
                let tempArr = slack_items_attached.split(',');
                repeat = tempArr.filter(note => {
                    return +note === slack_item_id
                })
                if(repeat.length > 0){
                    console.log("REPEAT no action taken, alert needed")
                    window.alert("Item is already attached to this note. No duplicate notes")
                } else {
                    total_items_attached++
                    let newAttached = tempArr + `,${slack_item_id}`
                    let noteEdit = {slack_items_attached: newAttached, total_items_attached: total_items_attached}
                    if(props.stickyNote){
                        console.log("came from another note", props.stickyNote)
                        removeAttachment()
                        props.attachPocketItem(noteEdit, sticky_note_id, props.stickyNote.id)
                    } else {
                        props.attachPocketItem(noteEdit, sticky_note_id)
                    }
                }
            }
        }
    }
}

