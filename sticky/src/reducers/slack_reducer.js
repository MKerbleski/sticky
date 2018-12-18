import {   
    FETCHING_SLACK_STARS,
    SLACK_STARS_RECIEVED,
    SLACK_ERROR
} from '../actions';


const initialState = {    
}

export const slackReducer = (state = initialState, action) => {
   switch(action.type) {
        case SLACK_STARS_RECIEVED:
            return Object.assign({}, state, {
                slackStars: action.payload.items,
                gettingSlackStars: false
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
        default: 
            return state;
   }
}