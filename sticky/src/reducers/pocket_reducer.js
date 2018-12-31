import {   
    EDITING_LIST,
    POCKET_LIST_RECIEVED,
    LIST_EDITED,
    FETCHING_POCKET_LIST,
    POCKET_ERROR,
    ERROR,
} from '../actions/pocket_actions';

const initialState = {    
    fetchingPocketList: false,
}

export const pocketReducer = (state = initialState, action) => {
    switch(action.type) {
        case EDITING_LIST:
            return Object.assign({}, state, {
                attachingPocketItem: true,
            })
        case LIST_EDITED:
            return Object.assign({}, state, {
                attachingPocketItem: false,
            })
        case POCKET_LIST_RECIEVED:
            return Object.assign({}, state, {
                pocketList: action.payload.pocketList,
                fetchingPocketList: false
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