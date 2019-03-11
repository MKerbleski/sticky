export const sourceIsAttachment = (sourceObj, targetObj) => {
    const target = targetObj.note
    const source = sourceObj
    const targetParent = targetObj.parent
    // const sourceNoteId = sourceObj.item.permalink
    const sourceParent = sourceObj.parent

    //from note
    let total_items_attached;
    let sticky_items_attached;
    let pocket_items_attached;

    //from pockt 
    let item_id

    //from slack
    let permalink
    console.log("\n ==sharedStickyNoteDrop== \n",
        '\ntarget:',target,
        '\nsource:', source,
        '\ntargetParent:', targetParent,
        '\nsourceParent:', sourceParent,
    )
}