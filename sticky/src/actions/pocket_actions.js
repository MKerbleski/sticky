import axios from 'axios';
import { getAttachedItems } from './index'

export const ATTACHING_POCKET_ITEM = 'ATTACHING_POCKET_ITEM';
export const FETCHING_POCKET_LIST = 'FETCHING_POCKET_List';
export const POCKET_LIST_RECIEVED = 'POCKET_LIST_RECIEVED';
export const POCKET_ITEM_ATTACHED = 'POCKET_ITEM_ATTACHED';
export const POCKET_ERROR = 'POCKET_ERROR';
export const ERROR = 'ERROR';

//THIS SHOULD BE ATTACH iTEMS AND LIVE IN NOTES ACTIONS
export const attachPocketItem = (newAttached, sticky_note_id) => {
  console.log("attachedPocketItem", newAttached)
    return function(dispatch){
      if(localStorage.getItem('JWT')){
        dispatch({type: ATTACHING_POCKET_ITEM});
        const token = localStorage.getItem('JWT')
        const authHeader = {
          headers: {
            Authorization: token,
          }
        }
        axios.put(`http://localhost:3333/api/notes/${sticky_note_id}`, (newAttached), authHeader 
        ) 
        .then(res => {
          dispatch({type: POCKET_ITEM_ATTACHED, payload: res.data})
          dispatch(getAttachedItems(sticky_note_id));
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