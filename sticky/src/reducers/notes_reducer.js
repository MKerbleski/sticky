import {   
    SENDING_NEW_NOTE,
    DELETING_NOTE,
    DEL_NOTES_RECIEVED,
    EDITING_NOTE,
    FETCHING_DEL_NOTES,
    FETCHING_NOTES,
    FETCHING_LINKS,
    LINKS_RECIEVED,
    NEW_NOTE_ADDED,
    NOTE_DELETED,
    NOTE_EDITED,
    NOTES_RECIEVED,
    SORT_NOTE,
    NOTE_ERROR,
    FETCHING_ATTACHED_ITEMS,
    ATTACHED_ITEMS_RECIEVED,
    CREDENTIAL_ERROR,
    ERROR_ADDING_NEW_NOTE,
    EDITING_LIST,
    LIST_EDITED,
    LIST_EDIT_ERROR
 } from '../actions/note_actions';


const initialState = {    
    notes: [],
    addingNote: false,
    noteAdded: false,
    fetchingNotes: false,
    notesRecieved: false,
}

export const notesReducer = (state = initialState, action) => {
    switch(action.type) {
        case LIST_EDIT_ERROR:
            return Object.assign({}, state, {
                
            })
        case EDITING_LIST:
            return Object.assign({}, state, {
                attachingPocketItem: true,
            })
        case LIST_EDITED:
            return Object.assign({}, state, {
                attachingPocketItem: false,
                triggerGetNotes: true
            })
        case CREDENTIAL_ERROR:
            return Object.assign({}, state, {
                credentialError: true,
            })
        case FETCHING_ATTACHED_ITEMS:
            return Object.assign({}, state, {
                fetchingAttachedItems: true,
                triggerAttached: false
            })
        case ATTACHED_ITEMS_RECIEVED:
            return Object.assign({}, state, {
                fetchingAttachedItems: false,
                attachedItems: action.payload,
            })
        case FETCHING_DEL_NOTES:
            return Object.assign({}, state, {
                fetchingDelNotes: true,
            })
        case DEL_NOTES_RECIEVED:
            return Object.assign({}, state, {
                fetchingDelNotes: false,
                notes: action.payload.allUserDelNotes
            })       
        case FETCHING_LINKS:
            return Object.assign({}, state, {
                fetchingLinks: true,
            })
        case LINKS_RECIEVED:
            return Object.assign({}, state, {
                fetchingLinks: false,
                linksRecieved: true,
                links: action.payload.allUserLinks,
            })
        case FETCHING_NOTES:
            return Object.assign({}, state, {
                fetchingNotes: true,
                triggerAttached: true,
                triggerGetNotes: false
            })
        case NOTES_RECIEVED:
            return Object.assign({}, state, {
                fetchingNotes: false,
                notesRecieved: true,
                notes: action.payload.allUserNotes,
                username: action.payload.username
            })
        case SENDING_NEW_NOTE:
            return Object.assign({}, state, {
                sendingNewNote: true,
            })
        case NEW_NOTE_ADDED:
            return Object.assign({}, state, {
                sendingNewNote: false,
                noteAdded: true,
            })    
        case ERROR_ADDING_NEW_NOTE:
            return Object.assign({}, state, {
                sendingNewNote: false,
                noteAdded: false,
            })    
        case DELETING_NOTE:
            return Object.assign({}, state, {
                deletingNote: true,
            })
        case NOTE_DELETED:
            return Object.assign({}, state, {
                deletingNote: false,
                noteDeleted: true,
                status: action.payload,
            })
        case EDITING_NOTE:
            return Object.assign({}, state, {
                editingNote: true,
            })
        case NOTE_EDITED:
            return Object.assign({}, state, {
                editingNote: false,
                noteEdited: true,
                status: action.payload,
            })
        case SORT_NOTE:
            return Object.assign({}, state, {
                customSort: true,
                notes: action.payload,
            })
        case NOTE_ERROR: 
            return Object.assign({}, state, {
                noteError: true,
                noteErrMsg: action.payload
            })
        default: 
            return state;
    }
}