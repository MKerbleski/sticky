import axios from 'axios';

axios.defaults.withCredentials = true;

export const FETCHING_DATA = 'FETCHING_DATA';
export const NOTE_ADDED = 'NOTE_ADDED';
export const SENDING_NEWNOTE = 'SENDING_NEWNOTE';
export const SENDING_DATA = 'SENDING_DATA';
export const DATA_RECIEVED = 'DATA_RECIEVED';
export const DATA_UPDATED = 'DATA_UPDATED';
export const ERROR = 'ERROR';

export const getNotes = () => {
  return function(dispatch){
    setTimeout( ()=> {
      dispatch({type: FETCHING_DATA});
      axios.get('https://notes-dnd-backend.herokuapp.com/api/notes/').then(res => {
        dispatch({type: DATA_RECIEVED, payload: res.data});
      }).catch(err => {
        dispatch({type: ERROR, payload: err})
      })
    }, 0)
  }
}

export const editNote = (newNote) => {
  return function(dispatch){
    dispatch({type: SENDING_DATA, payload:"Sending Change"});
    axios.put(`https://notes-dnd-backend.herokuapp.com/api/notes/${newNote.id}`, newNote).then(res => {
      dispatch({type: DATA_UPDATED, payload: `${res.data} note updating`})
    }).catch(err => {
      dispatch({type: ERROR, payload: err})
    })
  }
}

export const addNote = (newNote) => {
  return function(dispatch){
    dispatch({type: SENDING_NEWNOTE, payload:"Sending Change"});
    axios.post(`https://notes-dnd-backend.herokuapp.com/api/notes/`, newNote)
      .then(res => {
        dispatch({type: NOTE_ADDED, payload: `added note ${res.data}`})
        dispatch({type: FETCHING_DATA});
        axios.get('https://notes-dnd-backend.herokuapp.com/api/notes/').then(res => {
          dispatch({type: DATA_RECIEVED, payload: res.data});
        }).catch(err => {
          dispatch({type: ERROR, payload: err})
        })
      })
      .catch(err => {
        dispatch({type: ERROR, payload: err})
    })
  }
}
