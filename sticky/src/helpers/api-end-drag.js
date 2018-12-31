import { editAttachedItems } from '../actions/index.js'

export const sharedEndDrag = (props, monitor, type) => {
    if(!monitor.didDrop()){
        return;
    }
    const sticky_target = monitor.getDropResult();
    console.log("sharedEndDrag props:", props, sticky_target, type)
    let total_items_attached = sticky_target.total_items_attached
    const item_id = props.item.id;
    const parentStickyNote = props.stickyNote;
    const removeItem = () => {
        let total_items_attached = parentStickyNote.total_items_attached
        if(total_items_attached === 1){
            let noteEdit = {[type]: null, total_items_attached: 0}
            return noteEdit
        } else {
            let itemArr = parentStickyNote[type]
            itemArr = itemArr.split(',')
            let index = itemArr.indexOf(`${item_id}`)
            if(index > -1){
                itemArr.splice(index, 1)
                if(total_items_attached > 1){
                    total_items_attached--
                } else {
                    total_items_attached = 0
                }
            }
            let itemsAttached = itemArr.join(',')
            let noteEdit = {[type]: itemsAttached, total_items_attached: total_items_attached}
            return noteEdit
        }
    }    
    if(sticky_target.type === "deleteBin"){
        let sticky_source = props.stickyNote;
        let sticky_source_edit = removeItem(sticky_source)
        let sticky_source_id = sticky_source.id
        return { 
            sticky_source: {
                sticky_source_edit, sticky_source_id
            }
        }
    } else if (sticky_target.type === "note"){ 
        let sticky_target_id = sticky_target.targetId
        let sticky_target_edit;
        //add note to target sticky
        let list = sticky_target[type]
        if(list && list.length > 0){
            //there are items on this note
            let repeat = 0;
            let itemArr = list.split(',');
            repeat = itemArr.filter(note => {
                return +note === item_id
            })
            if(repeat.length > 0){
                console.log("Item is already attached to sticky note")
                window.alert("Item is already attached to sticky note")
            } else {
                total_items_attached++
                let newAttached = itemArr + `,${item_id}`
                sticky_target_edit = {[type]: newAttached, total_items_attached: total_items_attached}
            }
        } else {
            //there is no items on sticky target
            console.log("single item goes from right menu to note")
            total_items_attached++
            sticky_target_edit = {[type]: `${item_id}`, total_items_attached: total_items_attached}
        }
        //is sticky Source? 
        if(parentStickyNote){
            //if yes make sticky source stuff and some both
            console.log("single item goes from one note to another", props.stickyNote)
            let sticky_source_id = props.stickyNote.id
            //remove from sticky_source
            let sticky_source_edit = removeItem();
            return { 
                sticky_source: {
                    sticky_source_edit, sticky_source_id
                }, 
                sticky_target: {
                    sticky_target_edit, sticky_target_id
                }
            }
        } else {
            //it came from right menu, just send target
            return { 
                sticky_target: {
                    sticky_target_edit, sticky_target_id
                }
            }
        }
    }
}


//item from right menu to note
    //edit target only 
//item from note to note
    //edit target and source
//item from note to delete bin 
    //edit source only