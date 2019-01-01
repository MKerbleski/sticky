import { editNote } from '../actions'

export const sharedStickyNoteDrop = (sticky_source_id, target_id, target) => {
    if(sticky_source_id !== target_id){
        switch(target.type){
            case 'note':
                  console.log('note', sticky_source_id, target_id, editNote)
                if(sticky_source_id !== target_id){
                  //   console.log("not same", sticky_source_id, target_id)
                    return {id: sticky_source_id, parent_id: target_id}
                }
                break;
            case 'deleteBin':
                return {is_deleted: true, id: sticky_source_id}
            case 'top':
                return {id: sticky_source_id, parent_id: null}
            default: 
                console.log("default")
                break;
        }
    } else {
        return null
    }
}