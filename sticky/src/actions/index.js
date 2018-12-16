import axios from 'axios';

export const API_LIST_RECIEVED = 'API_LIST_RECIEVED';
export const ADDING_NOTE = 'ADDING_NOTE';
export const CREDENTIALS_ACCEPTED = 'CREDENTIALS_ACCEPTED';
export const DELETING_NOTE = 'DELETING_NOTE';
export const DEL_NOTES_RECIEVED = 'DEL_NOTES_RECIEVED';
export const EDITING_NOTE = 'EDITING_NOTE';
export const ERROR = 'ERROR';
export const FAILED_LOGIN_ATTEMPT = 'FAILED_LOGIN_ATTEMPT';
export const FAILED_REGISTRATION_ATTEMPT = 'FAILED_REGISTRATION_ATTEMPT';
export const FETCHING_API_LIST = 'FETCHING_API_LIST';
export const FETCHING_DEL_NOTES = 'FETCHING_DEL_NOTES';
export const FETCHING_LINKS = 'FETCHING_LINKS';
export const FETCHING_NOTES = 'FETCHING_NOTES';
export const FETCHING_SLACK_STARS = 'FETCHING_SLACK_STARS';
export const FETCHING_USERDATA = 'FETCHING_USER';
export const LINKS_RECIEVED = 'LINKS_RECIEVED';
export const LOGOUT = 'LOGOUT';
export const NOTE_ADDED = 'NOTE_ADDED';
export const NOTES_RECIEVED = 'NOTES_RECIEVED';
export const NOTE_DELETED = 'NOTE_DELETED';
export const NOTE_EDITED = 'NOTE_EDITED';
export const POCKET_NOTES_RECIEVED = 'POCKET_NOTES_RECIEVED';
export const SENDING_CREDENTIALS = 'SENDING_CREDENTIALS';
export const SENDING_NEW_USERDATA = 'SENDING_NEW_USERDATA';
export const SORT_NOTE = 'SORT_NOTE';
export const SLACK_STARS_RECIEVED = 'SLACK_STARS_RECIEVED';
export const USERDATA_RECIEVED = 'USER_RECIEVED';
export const USER_CREATED = 'USER_CREATED';

export const getDeletedNotes = () => {
  return function(dispatch){
  if(localStorage.getItem('JWT')){
    dispatch({type: FETCHING_DEL_NOTES})
      const token = localStorage.getItem('JWT')
      const authHeader = {
        headers: {
          Authorization: token,    
        } 
      }
      axios.get(`http://localhost:3333/api/notes/del`, authHeader)
      .then(res => {
        dispatch({type: DEL_NOTES_RECIEVED, payload: res.data})
      }).catch(err => console.log(err.message))
    }else {
      console.log('need to include toekn in request')
    }
  }
}

export const getConnectedApis = () =>  {
  return function(dispatch){
    if(localStorage.getItem('JWT')){
      dispatch({type: FETCHING_API_LIST});
      const token = localStorage.getItem('JWT')
      const authHeader = {
        headers: {
          Authorization: token, 
        }
      }
      axios.get('http://localhost:3333/api/user/apis', authHeader)
      .then(res => {
        // let apiStr = res.data.connected_apis 
        // let apiArr = turnToArr(apiStr);
        dispatch({type: API_LIST_RECIEVED, payload: res.data})
      })
      .catch(err => {
        dispatch({type: ERROR, payload: err})
      })
    } else {
      dispatch({type: ERROR, payload: 'there was no token found'})      
    }
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

export const getSlackStars = () =>  {
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

export const getPocketNotes = () =>  {
  return function(dispatch){
    if(localStorage.getItem('JWT')){
      dispatch({type: FETCHING_SLACK_STARS});
      const token = localStorage.getItem('JWT')
      const authHeader = {
        headers: {
          Authorization: token, 
        }
      }
      axios.get(`http://localhost:3333/api/pocket/notes`, authHeader)
      .then(res => {
        dispatch({type: POCKET_NOTES_RECIEVED, payload: res.data})
      })
      .catch(err => {
        dispatch({type: ERROR, payload: err})
      })
    } else {
      dispatch({type: ERROR, payload: 'there was no token found'})      
    }
  }
}

export const getUserData = (username) =>  {
  return function(dispatch){
    if(localStorage.getItem('JWT')){
      dispatch({type: FETCHING_USERDATA});
      const token = localStorage.getItem('JWT')
      const authHeader = {
        headers: {
          Authorization: token, 
        }
      }
      axios.get(`http://localhost:3333/api/user/settings`, authHeader)
      .then(res => {
        dispatch({type: USERDATA_RECIEVED, payload: res.data})
      })
      .catch(err => {
        dispatch({type: ERROR, payload: err})
      })
    } else {
      dispatch({type: ERROR, payload: 'there was no token found'})      
    }
  }
}

export const logout = () => {
  return function(dispatch){
    dispatch({type: LOGOUT})
  }
}

export const sortNote = (newlySortedArray) => {
  return function(dispatch){
    dispatch({type: SORT_NOTE, payload: newlySortedArray});
  }
}

// const turnToArr = (string) => {
//   let arr = string.split(',')
//   return arr
// }