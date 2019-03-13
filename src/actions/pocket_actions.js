import axios from 'axios';

import {
    getUserData
} from "./user_actions"

export const FETCHING_POCKET_LIST = 'FETCHING_POCKET_LISTS';
export const POCKET_LIST_RECIEVED = 'POCKET_LIST_RECIEVED';
export const POCKET_ERROR = 'POCKET_ERROR';
export const POCKET_SETTINGS_RECIEVED = 'POCKET_SETTINGS_RECIEVED';
export const POCKET_INITIALIZED = 'POCKET_INITIALIZED';
export const INIT_POCKET = 'INIT_POCKET';
export const ERROR = 'ERROR';


export const getPocketList = () =>  {
    return function(dispatch){
        if(localStorage.getItem('JWT')){
            dispatch({type: FETCHING_POCKET_LIST});
            const token = localStorage.getItem('JWT')
            const authHeader = { headers: { Authorization: token } }
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/pocket/quick`, authHeader)
            .then(res => {
                localStorage.setItem('pocketList', res.data)
                dispatch({type: POCKET_LIST_RECIEVED, payload: res.data})})
            .catch(err => {
              dispatch({type: POCKET_ERROR, payload: err})})
        } else {
            dispatch({type: ERROR, payload: 'there was no token found'})      
        }
    }
}

export const getPocketSettings = (sticky_user_id) =>  {
    return function(dispatch){
        if(localStorage.getItem('JWT')){
            // dispatch({type: FETCHING_POCKET_LIST});
            const token = localStorage.getItem('JWT')
            const authHeader = { headers: { Authorization: token } }
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/pocket/settings`, authHeader)
            .then(res => {
                dispatch({type: POCKET_SETTINGS_RECIEVED, payload: res.data})})
            .catch(err => {
                dispatch({type: POCKET_ERROR, payload: err})})
        } else {
            dispatch({type: ERROR, payload: 'there was no token found'})      
        }
    }
}

export const syncPocketList = (sticky_user_id) =>  {
    return function(dispatch){
        if(localStorage.getItem('JWT')){
            const token = localStorage.getItem('JWT')
            const authHeader = {
                headers: {
                    Authorization: token, 
                }
            }
            dispatch({type: INIT_POCKET});
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/pocket/sync`, authHeader).then(res => {
                //stop spinning wheel here...
                // console.log(res.data)
                dispatch({type: POCKET_INITIALIZED, payload: res.data})
                dispatch(getUserData())
            }).catch(err => {
                dispatch({type: POCKET_ERROR, payload: err})
                console.log("error!")
            })
        } else {
            console.log("no token found.")
        }
    }
}