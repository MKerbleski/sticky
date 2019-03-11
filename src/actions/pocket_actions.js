import axios from 'axios';
export const FETCHING_POCKET_LIST = 'FETCHING_POCKET_List';
export const POCKET_LIST_RECIEVED = 'POCKET_LIST_RECIEVED';
export const POCKET_ERROR = 'POCKET_ERROR';
export const POCKET_SETTINGS_RECIEVED = 'POCKET_SETTINGS_RECIEVED';
export const ERROR = 'ERROR';

export const getPocketList = () =>  {
    return function(dispatch){
        if(localStorage.getItem('JWT')){
            dispatch({type: FETCHING_POCKET_LIST});
            const token = localStorage.getItem('JWT')
            const authHeader = { headers: { Authorization: token } }
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/pocket/list`, authHeader)
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