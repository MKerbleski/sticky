import {
  FETCHING_DATA,
  DATA_RECIEVED, 
  ERROR, 
  SENDING_DATA, 
  DATA_UPDATED, 
  SENDING_NEWNOTE,
  NOTE_ADDED } from '../actions';

const initState = {
  allNotes: [],
  fetchingData: false,
  fetchedData: false,
  hasErrors: false,
  sendingData: false,
  status: '',
}

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return Object.assign({}, state, {
        fetchingData: true,
        status: "Updating Pages"
      })
    case DATA_RECIEVED:
      return Object.assign({}, state, {
        allNotes: action.payload,
        fetchingData: false,
        fetchedData: true,
        status: 'All changes saved.',
      })
    case SENDING_DATA:
      return Object.assign({}, state, {
        sendingData: true, 
        status: "Connecting to Server."
      })
    case DATA_UPDATED:
      return Object.assign({}, state, {
        sendingData: false, 
        status: "notes are all current"
      })
    case SENDING_NEWNOTE:
      return Object.assign({}, state, {
        sendingNewNote: true, 
        status: "connecting to server to post note"
      })
    case NOTE_ADDED:
      return Object.assign({}, state, {
        sendingData: true, 
        status: "Note Added"
      })
    case ERROR:
      return {
        hasErrors: true,
      }
    default:
      return state;
  }
}