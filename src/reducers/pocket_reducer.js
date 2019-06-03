import {   
    POCKET_LIST_RECIEVED,
    FETCHING_POCKET_LIST,
    POCKET_ERROR,
    ERROR,
    POCKET_SETTINGS_RECIEVED,
    POCKET_SYNC_SUCESS
} from '../actions/pocket_actions';

const initialState = {    
    fetchingPocketList: false,
}

export const pocketReducer = (state = initialState, action) => {
    switch(action.type) {
        case POCKET_SYNC_SUCESS:
            return Object.assign({}, state, {
                pocketList: action.payload,
                fetchingPocketList: false
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
              pocketErrMsg: action.payload
            })
        case ERROR:
            return Object.assign({}, state, {
                error: action.payload
            })
        default: 
            return state;
    }
}