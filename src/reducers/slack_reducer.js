import {   
    FETCHING_SLACK_STARS,
    SLACK_STARS_RECIEVED,
    SLACK_SETTINGS_RECIEVED,
    SLACK_ERROR,
    START_SYNC,
    SLACK_INITIALIZED
} from '../actions/slack_actions';

const initialState = {    
}

export const slackReducer = (state = initialState, action) => {
   switch(action.type) {
        case SLACK_STARS_RECIEVED:
            return Object.assign({}, state, {
                slackStars: action.payload,
                gettingSlackStars: false
            })
        case SLACK_SETTINGS_RECIEVED:
            return Object.assign({}, state, {
                slackSettings: action.payload,
            })
        case FETCHING_SLACK_STARS:
            return Object.assign({}, state, {
                gettingSlackStars: true
            })
        case SLACK_ERROR:
            return Object.assign({}, state, {
                gettingSlackStars: false,
                slackError: true,
                slackErrMsg: action.payload
            })
        case START_SYNC:
            return Object.assign({}, state, {
                slackSync: true,
            })
        case SLACK_INITIALIZED:
            return Object.assign({}, state, {
                slackSync: false,
            })
        default: 
            return state;
   }
}