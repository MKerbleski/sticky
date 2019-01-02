export const sharedStickyNoteDrop = (sticky_source_id, target_id, target) => {
    if(sticky_source_id !== target_id){
        switch(target.type){
            case 'note':
                return {id: sticky_source_id, parent_id: target_id}
            case 'deleteBin':
                return {is_deleted: true, id: sticky_source_id}
            case 'top':
                return {id: sticky_source_id, parent_id: null}
            default: 
                console.log("retured null, there was no type on target object")
                return null
        }
    } else {
        return null
    }
}