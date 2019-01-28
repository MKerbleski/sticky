import axios from 'axios';

export const API_LIST_RECIEVED = 'API_LIST_RECIEVED';
export const CREDENTIALS_ACCEPTED = 'CREDENTIALS_ACCEPTED';
export const ERROR = 'ERROR';
export const FAILED_LOGIN_ATTEMPT = 'FAILED_LOGIN_ATTEMPT';
export const FAILED_REGISTRATION_ATTEMPT = 'FAILED_REGISTRATION_ATTEMPT';
export const FETCHING_API_LIST = 'FETCHING_API_LIST';
export const FETCHING_USERDATA = 'FETCHING_USER';
export const LOGOUT = 'LOGOUT';
export const SENDING_CREDENTIALS = 'SENDING_CREDENTIALS';
export const SENDING_NEW_USERDATA = 'SENDING_NEW_USERDATA';
export const USERDATA_RECIEVED = 'USER_RECIEVED';
export const USER_CREATED = 'USER_CREATED';
export const USER_ERROR = 'USER_ERROR';

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
          dispatch({type: USER_ERROR, payload: err})
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