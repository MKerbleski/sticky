import axios from 'axios';

import {
    getUserData
} from "./user_actions"

import {
    DEFAULT_POCKET_ITEMS_TO_FETCH
} from "../helpers/defaultVariables.js"

export const FETCHING_POCKET_LIST = 'FETCHING_POCKET_LISTS';
export const POCKET_LIST_RECIEVED = 'POCKET_LIST_RECIEVED';
export const POCKET_ERROR = 'POCKET_ERROR';
export const POCKET_SETTINGS_RECIEVED = 'POCKET_SETTINGS_RECIEVED';
export const POCKET_SYNC_SUCESS = 'POCKET_SYNC_SUCESS';
export const START_POCKET_SYNC = 'START_POCKET_SYNC';
export const ERROR = 'ERROR';


export const getPocketList = (howMany=DEFAULT_POCKET_ITEMS_TO_FETCH) =>  {
    return function(dispatch){
        if(localStorage.getItem('JWT')){
            dispatch({type: FETCHING_POCKET_LIST});
            const token = localStorage.getItem('JWT')
            const authHeader = { headers: { Authorization: token } }
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/pocket/quick/${howMany}`, authHeader)
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
            dispatch({type: START_POCKET_SYNC});
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/pocket/sync`, authHeader).then(res => {
                //stop spinning wheel here...
                // console.log(res.data)
                dispatch({type: POCKET_SYNC_SUCESS, payload: res.data})
                dispatch(getUserData())
                // dispatch(getPocketList())
            }).catch(err => {
                dispatch({type: POCKET_ERROR, payload: err})
                console.log("error!")
            })
        } else {
            console.log("no token found.")
        }
    }
}