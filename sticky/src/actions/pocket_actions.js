import axios from 'axios';
import { getAttachedItems, getNotes } from './index'

export const EDITING_LIST = 'EDITING_LIST';
export const FETCHING_POCKET_LIST = 'FETCHING_POCKET_List';
export const POCKET_LIST_RECIEVED = 'POCKET_LIST_RECIEVED';
export const LIST_EDITED = 'LIST_EDITED';
export const POCKET_ERROR = 'POCKET_ERROR';
export const ERROR = 'ERROR';

//NEEDS TO BE RENAMED AND GO IN NOTES
export const editAttachedItems = (newAttached, sticky_note_id, parent_id=null) => {
  console.log("editAttachedItems", newAttached)
    return function(dispatch){
      if(localStorage.getItem('JWT')){
        dispatch({type: EDITING_LIST});
        const token = localStorage.getItem('JWT')
        const authHeader = {
          headers: {
            Authorization: token,
          }
        }
        axios.put(`http://localhost:3333/api/notes/${sticky_note_id}`, (newAttached), authHeader 
        ) 
        .then(res => {
          dispatch({type: LIST_EDITED, payload: res.data})
          if(parent_id === null){
            dispatch(getAttachedItems(sticky_note_id));
          } else {
            dispatch(getAttachedItems(parent_id));
          }
          dispatch(getNotes());
        })
        .catch(err => {
          console.log("error returnd from notes/edit endpoint", err)
          dispatch({type: POCKET_ERROR, payload: err})
        })
      } else {
        dispatch({type: ERROR, payload: 'there was no token found'})      
      }
    }
  }

  export const getPocketList = () =>  {
    return function(dispatch){
      if(localStorage.getItem('JWT')){
        dispatch({type: FETCHING_POCKET_LIST});
        const token = localStorage.getItem('JWT')
        const authHeader = {
          headers: {
            Authorization: token, 
          }
        }
        axios.get(`http://localhost:3333/api/pocket/list`, authHeader)
        .then(res => {
          dispatch({type: POCKET_LIST_RECIEVED, payload: res.data})
        })
        .catch(err => {
          dispatch({type: POCKET_ERROR, payload: err})
        })
      } else {
        dispatch({type: ERROR, payload: 'there was no token found'})      
      }
    }
  }