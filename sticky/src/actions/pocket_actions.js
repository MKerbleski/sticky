import axios from 'axios';
import { getAttachedItems, getNotes } from './index'

export const EDITING_LIST = 'EDITING_LIST';
export const FETCHING_POCKET_LIST = 'FETCHING_POCKET_List';
export const POCKET_LIST_RECIEVED = 'POCKET_LIST_RECIEVED';
export const LIST_EDITED = 'LIST_EDITED';
export const POCKET_ERROR = 'POCKET_ERROR';
export const ERROR = 'ERROR';

//NEEDS TO BE RENAMED AND GO IN NOTES
export const editAttachedItems = (obj) => {
  console.log("editAttachedItems", obj)
    return function(dispatch){
      if(localStorage.getItem('JWT')){
        dispatch({type: EDITING_LIST});
        const token = localStorage.getItem('JWT')
        const authHeader = {
          headers: {
            Authorization: token,
          }
        }
        let {sticky_source, sticky_target} = obj
        if(sticky_target && sticky_source){
            let sticky_target_id = obj.sticky_target.sticky_target_id
            axios.put(`http://localhost:3333/api/notes/${sticky_target_id}`, (obj.sticky_target.sticky_target_edit), authHeader).then(res => {
                let sticky_source_id = obj.sticky_source.sticky_source_id
                axios.put(`http://localhost:3333/api/notes/${sticky_source_id}`, (obj.sticky_source.sticky_source_edit), authHeader).then(res1 => {
                    dispatch({type: LIST_EDITED, payload: res1.data})
                    dispatch(getNotes())})
                .catch(err => {
                    console.log("error returnd from notes/edit endpoint", err)
                    dispatch({type: POCKET_ERROR, payload: err})})})
            .catch(err => {
                console.log("error returnd from notes/edit endpoint", err)
                dispatch({type: POCKET_ERROR, payload: err})})
        } else if (obj.sticky_target){
            let sticky_target_id = obj.sticky_target.sticky_target_id
            axios.put(`http://localhost:3333/api/notes/${sticky_target_id}`, (obj.sticky_target.sticky_target_edit), authHeader).then(res => {
                dispatch({type: LIST_EDITED, payload: res.data})
                dispatch(getNotes())})
            .catch(err => {
                console.log("error returnd from edit attached items", err)
                dispatch({type: POCKET_ERROR, payload: err})})
        } else if (obj.sticky_source){
            let sticky_source_id = obj.sticky_source.sticky_source_id
            axios.put(`http://localhost:3333/api/notes/${sticky_source_id}`, (obj.sticky_source.sticky_source_edit), authHeader).then(res1 => {
                dispatch({type: LIST_EDITED, payload: res1.data})
                // dispatch(getAttachedItems(sticky_source_id));
                dispatch(getNotes())})
            .catch(err => {
                console.log("error returnd from notes/edit endpoint", err)
                dispatch({type: POCKET_ERROR, payload: err})})
        }
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