import {   
    // ATTACHED_ITEMS_RECIEVED,
    CREDENTIAL_ERROR,
    DEL_NOTES_RECIEVED,
    DELETING_NOTE,
    EDITING_NOTE,
    // EDITING_LIST,
    ERROR_ADDING_NEW_NOTE,
    ERROR_DELETING_NOTE,
    ERROR_EDITING_NOTE,
    // FETCHING_ATTACHED_ITEMS,
    FETCHING_DEL_NOTES,
    FETCHING_NOTES,
    // FETCHING_LINKS,
    // LINKS_RECIEVED,
    // LIST_EDIT_ERROR,
    // LIST_EDITED,
    NEW_NOTE_ADDED,
    NOTE_DELETED,
    NOTE_EDITED,
    NOTE_ERROR,
    NOTES_RECIEVED,
    SENDING_NEW_NOTE,
    // SORT_NOTE,
    SINGLE_NOTE_RECIEVED,
    // NOTE_RECIEVED,
    FETCHING_SINGLE_NOTE,
    NOTE_TO_NOTE,
    NOTE_TO_NOTE_COMPLETE,
    ERROR_EDITING_NOTE_TO_NOTE,
    ERROR,
    TOGGLE_NEW_NOTE,
 } from '../actions/note_actions';

const initialState = {    
    notes: [],
    addingNote: false,
    noteAdded: false,
    fetchingNotes: false,
    notesRecieved: false,
    showNewNote: false,
}

export const notesReducer = (state=initialState, action) => {
    switch(action.type) {
        case TOGGLE_NEW_NOTE:
            return Object.assign({}, state, {
                showNewNote: action.payload || !state.showNewNote,
            })
        case NOTE_TO_NOTE:
            return Object.assign({}, state, {
                editingNotes: true,
                noteEdits: action.payload
            })
        case NOTE_TO_NOTE_COMPLETE:
            return Object.assign({}, state, {
                editingNotes: false,
            })
        case ERROR_EDITING_NOTE_TO_NOTE:
            return Object.assign({}, state, {
                errorEditingNotes: true,
                error: action.payload
            })
        // case LIST_EDIT_ERROR:
        //     return Object.assign({}, state, {
                
        //     })
        // case EDITING_LIST:
        //     return Object.assign({}, state, {
        //         attachingPocketItem: true,
        //     })
        // case LIST_EDITED:
        //     return Object.assign({}, state, {
        //         attachingPocketItem: false,
        //         triggerGetNotes: true
        //     })
        case CREDENTIAL_ERROR:
            return Object.assign({}, state, {
                credentialError: true,
            })
        // case FETCHING_ATTACHED_ITEMS:
        //     return Object.assign({}, state, {
        //         fetchingAttachedItems: true,
        //         triggerAttached: false
        //     })
        // case ATTACHED_ITEMS_RECIEVED:
        //     return Object.assign({}, state, {
        //         fetchingAttachedItems: false,
        //         attachedItems: action.payload,
        //     })
        case FETCHING_DEL_NOTES:
            return Object.assign({}, state, {
                fetchingDelNotes: true,
            })
        case DEL_NOTES_RECIEVED:
            return Object.assign({}, state, {
                fetchingDelNotes: false,
                notes: action.payload.allUserDelNotes
            })       
        // case FETCHING_LINKS:
        //     return Object.assign({}, state, {
        //         fetchingLinks: true,
        //     })
        // case LINKS_RECIEVED:
        //     return Object.assign({}, state, {
        //         fetchingLinks: false,
        //         linksRecieved: true,
        //         links: action.payload.allUserLinks,
        //     })
        case FETCHING_NOTES:
            return Object.assign({}, state, {
                fetchingNotes: true,
                triggerAttached: true,
                triggerGetNotes: false,
                status: "Getting Notes!",
                notes: []
            })
        case FETCHING_SINGLE_NOTE:
            return Object.assign({}, state, {
                fetchingNotes: true,
                triggerAttached: true,
                triggerGetNotes: false,
                status: "Getting Note!"
            })
        case NOTES_RECIEVED:
            return Object.assign({}, state, {
                fetchingNotes: false,
                notesRecieved: true,
                notes: action.payload.allUserNotes,
                username: action.payload.username,
                status: "Got Notes!",
                singleNote: false,
                responseCode: null,
            })
        case SINGLE_NOTE_RECIEVED:
            return Object.assign({}, state, {
                fetchingNotes: false,
                notesRecieved: true,
                notes: action.payload,
                singleNote: true,
                responseCode: null,
                // children: action.payload.children,
                // username: action.payload.username,
                status: "Note Recieved"
            })
        // case NOTE_RECIEVED:
        //     return Object.assign({}, state, {
        //         fetchingNotes: false,
        //         notesRecieved: true,
        //         note: action.payload,
        //         username: action.payload.username,
        //         status: "Got Notes!"
        //     })
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
        case ERROR_DELETING_NOTE:
            return Object.assign({}, state, {
                deletingNote: false, 
                status: action.payload
            })
        case ERROR_EDITING_NOTE:
            return Object.assign({}, state, {
                editingNote: false, 
                status: action.payload
            })
        case EDITING_NOTE:
            return Object.assign({}, state, {
                editingNote: true,
                status: "Saving Note!"
            })
        case NOTE_EDITED:
            return Object.assign({}, state, {
                editingNote: false,
                noteEdited: true,
                // status: action.payload,
                status: "Note Saved!"
            })
        // case SORT_NOTE:
        //     return Object.assign({}, state, {
        //         customSort: true,
        //         notes: action.payload,
        //     })
        case NOTE_ERROR: 
            console.log(action.payload)
            return Object.assign({}, state, {
                responseCode: action.payload.response.status,
                noteError: true,
                note: null,
                noteErrMsg: action.payload,
                status: `Error fetching note. Error code:${ action.payload.response.status}`
            })
        case ERROR:
            if(action.payload.data.message){
                return Object.assign({}, state, {
                    status: action.payload.data.message,
                    code: action.payload.status
                })
            } else {
                return state
            } 
        default: 
            return state;
    }
}