import {   
    POCKET_LIST_RECIEVED,
    FETCHING_POCKET_LIST,
    POCKET_ERROR,
    ERROR,
    POCKET_SETTINGS_RECIEVED,
    POCKET_SYNC_SUCESS,
    START_POCKET_SYNC
} from '../actions/pocket_actions';

const initialState = {    
    fetchingPocketList: false,
}

export const pocketReducer = (state=initialState, action) => {
    switch(action.type) {
        case START_POCKET_SYNC:
            return Object.assign({}, state, {
                syncInProgress: true,
            })    
        case POCKET_SYNC_SUCESS:
            return Object.assign({}, state, {
                pocketList: action.payload,
                fetchingPocketList: false,
                syncInProgress: false,
            })

        case POCKET_LIST_RECIEVED:
            return Object.assign({}, state, {
                pocketList: action.payload.pocketList,
                fetchingPocketList: false
            })
        case POCKET_SETTINGS_RECIEVED:
            return Object.assign({}, state, {
                pocketSettings: action.payload,
            })
        case FETCHING_POCKET_LIST:
            return Object.assign({}, state, {
                fetchingPocketList: true
            })
        case POCKET_ERROR:    
            return Object.assign({}, state, {
              pocketError: true,
              pocketErrMsg: action.payload,
              syncInProgress: false,
            })
        case ERROR:
            return Object.assign({}, state, {
                error: action.payload
            })
        default: 
            return state;
    }
}