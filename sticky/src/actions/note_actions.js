import axios from 'axios';
export const SENDING_NEW_NOTE = 'SENDING_NEW_NOTE';
export const DELETING_NOTE = 'DELETING_NOTE';
export const EDITING_NOTE = 'EDITING_NOTE';
export const FETCHING_NOTES = 'FETCHING_NOTES';
export const NEW_NOTE_ADDED = 'NEW_NOTE_ADDED';
export const NOTES_RECIEVED = 'NOTES_RECIEVED';
export const NOTE_DELETED = 'NOTE_DELETED';
export const NOTE_EDITED = 'NOTE_EDITED';
export const SORT_NOTE = 'SORT_NOTE';
export const DEL_NOTES_RECIEVED = 'DEL_NOTES_RECIEVED';
export const FETCHING_DEL_NOTES = 'FETCHING_DEL_NOTES';
export const NOTE_ERROR = 'NOTE_ERROR';
export const ERROR = 'ERROR';
export const FETCHING_LINKS = 'FETCHING_LINKS';
export const LINKS_RECIEVED = 'LINKS_RECIEVED';
export const FETCHING_ATTACHED_ITEMS = 'FETCHING_ATTACHED_ITEMS';
export const ATTACHED_ITEMS_RECIEVED = 'ATTACHED_ITEMS_RECIEVED';
export const CREDENTIAL_ERROR = 'CREDENTIAL_ERROR';
export const ERROR_ADDING_NEW_NOTE = 'ERROR_ADDING_NEW_NOTE';

export const addNote = (newNote) => {
  return function(dispatch){
      if(localStorage.getItem('JWT')){
        const token = localStorage.getItem('JWT')
        const authHeader = {
          headers: {
            Authorization: token,    
          } 
        }
        dispatch({type: SENDING_NEW_NOTE})
        axios.post('http://localhost:3333/api/notes/', (newNote), authHeader).then(res => {
          dispatch({type: NEW_NOTE_ADDED})
          dispatch(getNotes());
        }).catch(err => {
          console.log(err.message)
          dispatch({type: ERROR_ADDING_NEW_NOTE})
        })
      } else {
        dispatch({type: CREDENTIAL_ERROR})
    }
  }
}

export const getAttachedItems = (sticky_note_id) => {
  return function(dispatch){
    if(localStorage.getItem('JWT')){
      dispatch({type: FETCHING_ATTACHED_ITEMS})
        const token = localStorage.getItem('JWT')
        const authHeader = {
          headers: {
            Authorization: token,    
          } 
        }
        axios.get(`http://localhost:3333/api/notes/attached/${sticky_note_id}`, authHeader).then(res => {
          dispatch({type: ATTACHED_ITEMS_RECIEVED, payload: res.data})
        }).catch(err => {
          dispatch({type: NOTE_ERROR, payload: err.message})
          console.log(err.message)
        })
    } else {
      console.log('need to include toekn in request')
    }
  }
}

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
        axios.get(`http://localhost:3333/api/notes/del`, authHeader).then(res => {
          dispatch({type: DEL_NOTES_RECIEVED, payload: res.data})
        }).catch(err => {
          dispatch({type: NOTE_ERROR, payload:err.message})
          console.log(err.message)
        })
    } else {
      console.log('need to include toekn in request')
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
        dispatch({type: NOTE_ERROR, payload: err})
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
        dispatch({type: NOTE_ERROR, payload: err})
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
  