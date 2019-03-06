import {   
    API_LIST_RECIEVED,
    CREDENTIALS_ACCEPTED,
    FAILED_LOGIN_ATTEMPT,
    FAILED_REGISTRATION_ATTEMPT,
    FETCHING_API_LIST,
    FETCHING_USERDATA,
    LOGOUT,
    SENDING_CREDENTIALS,
    SENDING_NEW_USERDATA,
    USER_CREATED,
    USERDATA_RECIEVED,
    USER_ERROR,
    ERROR
    // INVALID_CREDENTIALS
} from '../actions/user_actions';

const initialState = {    
   failedLoginAttempt: false,
//    userData: {}
}

export const userReducer = (state = initialState, action) => {
   switch(action.type) {
        case FETCHING_API_LIST:
            return Object.assign({}, state, {
                fetchingApiList: true,
            })
        case API_LIST_RECIEVED:
            return Object.assign({}, state, {
                fetchingApiList: false,
                connectedApis: action.payload
            })
        case LOGOUT: 
            return Object.assign({}, state, {
                notes: [],
                links: [],
                slackStars: [],
                userData: {},
                slackToken: null,
            })
        case FAILED_REGISTRATION_ATTEMPT:
            return Object.assign({}, state, {
                failedRegistrationAttempt: true,
            })
        case FAILED_LOGIN_ATTEMPT:
            return Object.assign({}, state, {
                failedLoginAttempt: true,
            })
        case SENDING_CREDENTIALS:
            return Object.assign({}, state, {
                sendingCredentials: true,
                sucessfulLogin: false,
            })
        case CREDENTIALS_ACCEPTED:
            return Object.assign({}, state, {
                sucessfulLogin: true,
                failedLoginAttempt: false,
                failedRegistrationAttempt: false,
                sendingCredentials: false,
                token: action.payload.token,
                username: action.payload.username
            })
        case SENDING_NEW_USERDATA:
            return Object.assign({}, state, {
                sendingNewUser: true,
            })
        case USER_CREATED:
            return Object.assign({}, state, {
                sendingNewUser: false,
                failedRegistrationAttempt: false,
                userCreated: true,
                username: action.payload.username,
                token: action.payload.token
            })
        case FETCHING_USERDATA:
            return Object.assign({}, state, {
                fetchingUserInfo: true,
            })
        case USERDATA_RECIEVED:
            return Object.assign({}, state, {
                fetchingUserInfo: false,
                userData: action.payload,
                slackToken: action.payload.slack
            })
        case USER_ERROR:
            return Object.assign({}, state, {
                userError: true,
                userErrMsg: action.payload
            })
        case ERROR:
            if(action.payload.data.message){
                return Object.assign({}, state, {
                    status: action.payload.data.message,
                    code: action.payload.status
                })
            } else {
                break;
            } 
       default: 
           return state;
   }
}