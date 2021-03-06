import axios from 'axios';
import { addNote } from './note_actions'
import { handleErrorCodes, syncSlack, syncPocketList } from './index'
import { getAuthHeader } from '../helpers/getAuthHeader'

export const API_LIST_RECIEVED = 'API_LIST_RECIEVED';
export const CREDENTIALS_ACCEPTED = 'CREDENTIALS_ACCEPTED';
export const ERROR = 'ERROR';
export const FAILED_LOGIN_ATTEMPT = 'FAILED_LOGIN_ATTEMPT';
export const FAILED_REGISTRATION_ATTEMPT = 'FAILED_REGISTRATION_ATTEMPT';
export const FETCHING_API_LIST = 'FETCHING_API_LIST';
export const FETCHING_USERDATA = 'FETCHING_USER';
export const LOGOUT = 'LOGOUT';
export const SENDING_CREDENTIALS = 'SENDING_CREDENTIALS';
export const VALID_CREDENTIALS = 'VALID_CREDENTIALS';
export const INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';
export const SENDING_NEW_USERDATA = 'SENDING_NEW_USERDATA';
export const USERDATA_RECIEVED = 'USER_RECIEVED';
export const USER_CREATED = 'USER_CREATED';
export const USER_ERROR = 'USER_ERROR';
export const CLEAR_USER_STATUS = 'CLEAR_USER_STATUS';


// export const USERNAME_AVAILIBLE = 'USERNAME_AVAILIBLE';
// export const USERNAME_TAKEN = 'USERNAME_TAKEN';

// export const checkUsername = (username) =>  {
//     return function(dispatch){
// 		axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/welcome/isthis/${username}/availble`).then(res => {
// 			console.log(res.data.message)
//             dispatch({type: USERNAME_AVAILIBLE, payload: res.data})
//         }).catch(err => {
//             console.log(err)
//             dispatch({type: USERNAME_TAKEN, payload: err})
//         })
// 	}
// }

// export const getConnectedApis = () =>  {
//     return function(dispatch){
// 		if(localStorage.getItem('JWT')){
// 			dispatch({type: FETCHING_API_LIST});
			
// 			axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/apis`, authHeader).then(res => {
// 				dispatch({type: API_LIST_RECIEVED, payload: res.data})
// 			}).catch(err => {
// 				dispatch({type: ERROR, payload: err})
// 			})
// 		} else {
// 			dispatch({type: ERROR, payload: 'there was no token found'})      
// 		}
// 	}
// }
  
export const getUserData = () =>  {
    return function(dispatch){
		if(localStorage.getItem('JWT')){
			dispatch({type: FETCHING_USERDATA});
			axios
				.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/settings`, getAuthHeader())
				.then(res => {
						dispatch({type: USERDATA_RECIEVED, payload: res.data})
						// if(!res.data.slack_initial_sync && res.data.slack){
						// 	dispatch(syncSlack(res.data.id))
						// }
						// if(!res.data.pocket_initial_sync && res.data.pocket){
						// 	console.log('first pocket sync')
						// 	dispatch(syncPocketList(res.data.id))
						// }	
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
		localStorage.removeItem('JWT');
        localStorage.removeItem('username');
        localStorage.removeItem('sticky_user_id');
		dispatch({type: LOGOUT})
	}
}

export const clearUserStatus = () => {
	return function(dispatch){
		dispatch({type: CLEAR_USER_STATUS})
	}
}

export const createUser = (newUser, redirect) => {
	return function(dispatch){
		dispatch({type: SENDING_NEW_USERDATA})
		axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/welcome/register/`, newUser).then(res => {
			// console.log("create user in welcome route", res.data)
            localStorage.setItem('JWT', res.data.token)
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('sticky_user_id', res.data.sticky_user_id)
            if(localStorage.getItem('text_body')){
				dispatch(addNote({text_body: localStorage.getItem('text_body')}))
            } 
            redirect(`/${res.data.username}`)
        }).catch(err => {
			dispatch(handleErrorCodes(err))
		})
	}
}

export const loginUser = (creds, redirect) => {
	return function(dispatch){
		dispatch({type: SENDING_CREDENTIALS})
		setTimeout(() => {
			axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/welcome/login`, creds).then(res => {
				dispatch({type: VALID_CREDENTIALS, payload: res.data})
				localStorage.setItem('JWT', res.data.token)
				localStorage.setItem('username', res.data.username)
				localStorage.setItem('sticky_user_id', res.data.sticky_user_id)
				if(localStorage.getItem('text_body')){
					dispatch(addNote({text_body: localStorage.getItem('text_body')}))
				}
				redirect(`/${res.data.username}`)
			}).catch(err => {
				dispatch(handleErrorCodes(err))
			})
		}, 2000)
	}
}