import axios from 'axios';

export const FETCHING_NOTES = 'FETCHING_NOTES';
export const NOTES_RECIEVED = 'NOTES_RECIEVED';
export const ERROR = 'ERROR';
export const ADDING_NOTE = 'ADDING_NOTE';
export const NOTE_ADDED = 'NOTE_ADDED';
export const DELETING_NOTE = 'DELETING_NOTE';
export const NOTE_DELETED = 'NOTE_DELETED';
export const EDITING_NOTE = 'EDITING_NOTE';
export const NOTE_EDITED = 'NOTE_EDITED';
export const SORT_NOTE = 'SORT_NOTE';
export const SENDING_NEW_USERDATA = 'SENDING_NEW_USERDATA';
export const USER_CREATED = 'USER_CREATED';
export const SENDING_CREDENTIALS = 'SENDING_CREDENTIALS';
export const CREDENTIALS_ACCEPTED = 'CREDENTIALS_ACCEPTED';
export const FAILED_LOGIN_ATTEMPT = 'FAILED_LOGIN_ATTEMPT';
export const FAILED_REGISTRATION_ATTEMPT = 'FAILED_REGISTRATION_ATTEMPT';
export const CLEAR_NOTES = 'CLEAR_NOTES';

export const clearNotes = () => {
  return function(dispatch){
    dispatch({type: CLEAR_NOTES})
  }
}

export const getNotes = () =>  {
  return function(dispatch){
    if(localStorage.getItem('JWT')){
      // console.log('token')
      dispatch({type: FETCHING_NOTES});
      const token = localStorage.getItem('JWT')
      const authHeader = {
        headers: {
          Authorization: token, 
        }
      }
      axios.get('http://localhost:3333/api/notes/all', authHeader)
        .then(res => {
        dispatch({type: NOTES_RECIEVED, payload: res.data})
      })
        .catch(err => {
        dispatch({type: ERROR, payload: err})
      })
    } else {
      dispatch({type: ERROR, payload: 'there was no token found'})      
    }
  }
}

export const sortNote = (newlySortedArray) => {
  return function(dispatch){
    dispatch({type: SORT_NOTE, payload: newlySortedArray});
  }
}
