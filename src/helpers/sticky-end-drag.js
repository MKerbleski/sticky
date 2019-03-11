//must return array
import {sourceIsNote, sourceIsAttachment} from './index'

export const sharedStickyNoteDrop = (sourceObj, targetObj) => {
    targetObj = targetObj.getDropResult()
    
    if(sourceObj.type === 'note'){
        return sourceIsNote(sourceObj, targetObj)
    } else {
        console.log("attachment")
        return sourceIsAttachment(sourceObj, targetObj)
    }
}