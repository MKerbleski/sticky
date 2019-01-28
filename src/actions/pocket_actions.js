import axios from 'axios';
export const FETCHING_POCKET_LIST = 'FETCHING_POCKET_List';
export const POCKET_LIST_RECIEVED = 'POCKET_LIST_RECIEVED';
export const POCKET_ERROR = 'POCKET_ERROR';
export const ERROR = 'ERROR';

export const getPocketList = () =>  {
    return function(dispatch){
        if(localStorage.getItem('JWT')){
            dispatch({type: FETCHING_POCKET_LIST});
            const token = localStorage.getItem('JWT')
            const authHeader = { headers: { Authorization: token } }
            axios.get(`http://localhost:3333/api/pocket/list`, authHeader)
            .then(res => {
              dispatch({type: POCKET_LIST_RECIEVED, payload: res.data})})
            .catch(err => {
              dispatch({type: POCKET_ERROR, payload: err})})
        } else {
            dispatch({type: ERROR, payload: 'there was no token found'})      
        }
    }
}