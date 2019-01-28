import { combineReducers } from 'redux';
import { pocketReducer } from './pocket_reducer';
import { slackReducer } from './slack_reducer';
import { userReducer } from './user_reducer';
import { notesReducer } from './notes_reducer';

export const masterReducer  = combineReducers({
    pocket: pocketReducer, 
    slack: slackReducer, 
    user: userReducer, 
    notes: notesReducer,
});