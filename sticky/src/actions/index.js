import axios from 'axios';

export const ADDING_NOTE = 'ADDING_NOTE';
export const FETCHING_NOTES = 'FETCHING_NOTES';
export const DELETING_NOTE = 'DELETING_NOTE';
export const EDITING_NOTE = 'EDITING_NOTE';

export const NOTE_ADDED = 'NOTE_ADDED';
export const NOTES_RECIEVED = 'NOTES_RECIEVED';
export const NOTE_DELETED = 'NOTE_DELETED';
export const NOTE_EDITED = 'NOTE_EDITED';

export const SORT_NOTE = 'SORT_NOTE';

export const LOGOUT = 'LOGOUT';

export const FETCHING_SLACK_STARS = 'FETCHING_SLACK_STARS';
export const SLACK_STARS_RECIEVED = 'SLACK_STARS_RECIEVED';

export const SENDING_CREDENTIALS = 'SENDING_CREDENTIALS';
export const CREDENTIALS_ACCEPTED = 'CREDENTIALS_ACCEPTED';
export const FAILED_LOGIN_ATTEMPT = 'FAILED_LOGIN_ATTEMPT';
export const FAILED_REGISTRATION_ATTEMPT = 'FAILED_REGISTRATION_ATTEMPT';
export const SENDING_NEW_USERDATA = 'SENDING_NEW_USERDATA';
export const USER_CREATED = 'USER_CREATED';
export const FETCHING_USER = 'FETCHING_USER';
export const USER_RECIEVED = 'USER_RECIEVED';

export const LINKS_RECIEVED = 'LINKS_RECIEVED';
export const FETCHING_LINKS = 'FETCHING_LINKS';

export const ERROR = 'ERROR';

export const logout = () => {
  return function(dispatch){
    dispatch({type: LOGOUT})
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

export const getLinks = () =>  {
  return function(dispatch){
    if(localStorage.getItem('JWT')){
      // console.log('token')
      dispatch({type: FETCHING_LINKS});
      const token = localStorage.getItem('JWT')
      const authHeader = {
        headers: {
          Authorization: token, 
        }
      }
      axios.get('http://localhost:3333/api/notes/all/links', authHeader)
        .then(res => {
        dispatch({type: LINKS_RECIEVED, payload: res.data})
      })
        .catch(err => {
        dispatch({type: ERROR, payload: err})
      })
    } else {
      dispatch({type: ERROR, payload: 'there was no token found'})      
    }
  }
}

export const getSlackList = () =>  {
  return function(dispatch){
    if(localStorage.getItem('JWT')){
      dispatch({type: FETCHING_SLACK_STARS});
      const token = localStorage.getItem('JWT')
      const authHeader = {
        headers: {
          Authorization: token, 
        }
      }
      axios.get(`http://localhost:3333/api/slack/stars`, authHeader)
        .then(res => {
        dispatch({type: SLACK_STARS_RECIEVED, payload: res.data})
      })
        .catch(err => {
        dispatch({type: ERROR, payload: err})
      })
    } else {
      dispatch({type: ERROR, payload: 'there was no token found'})      
    }
  }
}
export const getUser = (username) =>  {
  return function(dispatch){
    if(localStorage.getItem('JWT')){
      dispatch({type: FETCHING_USER});
      const token = localStorage.getItem('JWT')
      const authHeader = {
        headers: {
          Authorization: token, 
        }
      }
      axios.get(`http://localhost:3333/api/user/settings`, authHeader)
        .then(res => {
        dispatch({type: USER_RECIEVED, payload: res.data})
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
