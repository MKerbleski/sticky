import { editNote } from '../actions'

export const sharedStickyNoteDrop = (props, monitor) => {
    const sticky_source_id = props.layerOne.id;
    const target = monitor.getDropResult();
    const target_id = target.targetId;
    switch(target.type){
      case 'note':
          if(sticky_source_id !== target_id){
              editNote({id: sticky_source_id, parent_id: target_id})
          }
          break;
      case 'deleteBin':
          editNote({is_deleted: true, id: sticky_source_id})
          break;
      case 'top':
          editNote({id: sticky_source_id, parent_id: null})
          break
      default: 
          console.log("default")
          break;
    }
}