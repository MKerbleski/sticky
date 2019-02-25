import axios from 'axios';

export const ATTACHED_ITEMS_RECIEVED = 'ATTACHED_ITEMS_RECIEVED';
export const CREDENTIAL_ERROR = 'CREDENTIAL_ERROR';
export const DELETING_NOTE = 'DELETING_NOTE';
export const DEL_NOTES_RECIEVED = 'DEL_NOTES_RECIEVED';
export const ERROR = 'ERROR';
export const EDITING_LIST = 'EDITING_LIST';
export const EDITING_NOTE = 'EDITING_NOTE';
export const ERROR_EDITING_NOTE = 'ERROR_EDITING_NOTE';
export const ERROR_ADDING_NEW_NOTE = 'ERROR_ADDING_NEW_NOTE';
export const ERROR_DELETING_NOTE = 'ERROR_DELETING_NOTE';
export const FETCHING_ATTACHED_ITEMS = 'FETCHING_ATTACHED_ITEMS';
export const FETCHING_DEL_NOTES = 'FETCHING_DEL_NOTES';
export const FETCHING_LINKS = 'FETCHING_LINKS';
export const FETCHING_NOTES = 'FETCHING_NOTES';
export const LINKS_RECIEVED = 'LINKS_RECIEVED';
export const LIST_EDITED = 'LIST_EDITED';
export const LIST_EDIT_ERROR = 'LIST_EDIT_ERROR';
export const NEW_NOTE_ADDED = 'NEW_NOTE_ADDED';
export const NOTES_RECIEVED = 'NOTES_RECIEVED';
export const NOTE_DELETED = 'NOTE_DELETED';
export const NOTE_EDITED = 'NOTE_EDITED';
export const NOTE_ERROR = 'NOTE_ERROR';
export const SENDING_NEW_NOTE = 'SENDING_NEW_NOTE';
export const SORT_NOTE = 'SORT_NOTE';

export const NOTE_RECIEVED = 'NOTE_RECIEVED';

export const noteToNote = (notePackage) => {
    return function(dispatch){
        console.log('hey', notePackage)
        if(localStorage.getItem('JWT') && notePackage){
            const token = localStorage.getItem('JWT')
            const authHeader = { headers: { Authorization: token } }
            dispatch({ type: EDITING_NOTE })
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/notes/noteToNote`, (notePackage), authHeader).then(res => {
                console.log(res)
				dispatch(getNotes());
              	dispatch({ type: NOTE_EDITED })
            }).catch(err => {
              	dispatch({ type: ERROR_EDITING_NOTE })
              	console.log("error in edit note redux actions", err.message)})
        } else {
            console.log('there is note a Token or a note was dropped on itself')
        }
    }
}

export const editNote = (noteEdit, fetchDeleted=false) => {
    console.log(noteEdit)
    return function(dispatch){
        if(localStorage.getItem('JWT') && noteEdit){
            const token = localStorage.getItem('JWT')
            const authHeader = { headers: { Authorization: token } }
            dispatch({ type: EDITING_NOTE })
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${noteEdit.id}`, (noteEdit), authHeader).then(res => {
				if(fetchDeleted){
					dispatch(getDeletedNotes())
				} else {
					dispatch(getNotes());
				}   
              	dispatch({ type: NOTE_EDITED })
            }).catch(err => {
              	dispatch({ type: ERROR_EDITING_NOTE })
              	console.log("error in edit note redux actions", err.message)})
        } else {
            console.log('there is note a Token or a note was dropped on itself')
        }
    }
}

export const deleteNote = (id) => {
  	return function(dispatch){
      	if(localStorage.getItem('JWT')){
			const token = localStorage.getItem('JWT')
			const authHeader = {
				headers: { Authorization: token } 
			}
			dispatch({type: DELETING_NOTE})
          	axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${id}`, authHeader).then(res => {
             	dispatch({type: NOTE_DELETED})
              	dispatch(getDeletedNotes())
            }).catch(err => {
             	console.log("error deleting note", err.message)
             	dispatch({type: ERROR_DELETING_NOTE})
            })
      	} else {
         	console.log('need to include a valid token in request')
      	}
  	}
}

export const editAttachedItems = (obj) => {
    let {sticky_source, sticky_target} = obj
    return function(dispatch){
        if(localStorage.getItem('JWT') && obj.sticky_target !== null){
            dispatch({type: EDITING_LIST});
            const token = localStorage.getItem('JWT')
            const authHeader = {
              headers: {
                Authorization: token,
              }
            }
            if(sticky_target && sticky_source){
                let sticky_target_id = obj.sticky_target.sticky_target_id
                axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${sticky_target_id}`, (obj.sticky_target.sticky_target_edit), authHeader).then(res => {
                    let sticky_source_id = obj.sticky_source.sticky_source_id
                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${sticky_source_id}`, (obj.sticky_source.sticky_source_edit), authHeader).then(res1 => {
                        dispatch({type: LIST_EDITED, payload: res1.data})
                        dispatch(getNotes())})
                    .catch(err => {
                        console.log("error returnd from notes/edit endpoint", err)
                        dispatch({type: LIST_EDIT_ERROR, payload: err})})})
                .catch(err => {
                    console.log("error returnd from notes/edit endpoint", err)
                    dispatch({type: LIST_EDIT_ERROR, payload: err})})
            } else if (sticky_target){
                let sticky_target_id = obj.sticky_target.sticky_target_id
                axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${sticky_target_id}`, (obj.sticky_target.sticky_target_edit), authHeader).then(res => {
                    dispatch({type: LIST_EDITED, payload: res.data})
                    dispatch(getNotes())})
                .catch(err => {
                    console.log("error returnd from edit attached items", err)
                    dispatch({type: LIST_EDIT_ERROR, payload: err})})
            } else if (sticky_source){
                let sticky_source_id = obj.sticky_source.sticky_source_id
                axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${sticky_source_id}`, (obj.sticky_source.sticky_source_edit), authHeader).then(res1 => {
                    dispatch({type: LIST_EDITED, payload: res1.data})
                    dispatch(getNotes())})
                .catch(err => {
                    console.log("error returnd from notes/edit endpoint", err)
                    dispatch({type: LIST_EDIT_ERROR, payload: err})})
            }
        } else {
          	dispatch({type: ERROR, payload: 'there was no token found'})      
        }
    }
}

export const addNote = (newNote) => {
    return function(dispatch){
        if(localStorage.getItem('JWT')){
            const token = localStorage.getItem('JWT')
            const authHeader = {
				headers: {
					Authorization: token,    
				} 
            }
            dispatch({type: SENDING_NEW_NOTE})
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notes/`, (newNote), authHeader).then(res => {
				dispatch({type: NEW_NOTE_ADDED})
				dispatch(getNotes());
            }).catch(err => {
				console.log(err.message)
				dispatch({type: ERROR_ADDING_NEW_NOTE})
            })
        } else {
            dispatch({type: CREDENTIAL_ERROR})
        }
    }
}

export const getAttachedItems = (sticky_note_id) => {
    return function(dispatch){
        if(localStorage.getItem('JWT')){
          	dispatch({type: FETCHING_ATTACHED_ITEMS})
            const token = localStorage.getItem('JWT')
            const authHeader = {
				headers: {
					Authorization: token,    
				} 
            }
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes/attached/${sticky_note_id}`, authHeader).then(res => {
              	dispatch({type: ATTACHED_ITEMS_RECIEVED, payload: res.data})
            }).catch(err => {
              	dispatch({type: NOTE_ERROR, payload: err.message})
              	console.log(err.message)
            })
        } else {
          	console.log('need to include toekn in request')
        }
    }
}

export const getDeletedNotes = () => {
    return function(dispatch){
        if(localStorage.getItem('JWT')){
          dispatch({type: FETCHING_DEL_NOTES})
            const token = localStorage.getItem('JWT')
            const authHeader = {
				headers: {
					Authorization: token,    
				} 
            }
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes/del`, authHeader).then(res => {
              	dispatch({type: DEL_NOTES_RECIEVED, payload: res.data})
            }).catch(err => {
              	dispatch({type: NOTE_ERROR, payload:err.message})
              	console.log(err.message)
            })
        } else {
          	console.log('need to include token in request')
        }
    }
}

export const getNotes = (id) =>  {
	// console.log(id)
    return function(dispatch){
        if(localStorage.getItem('JWT')){
			dispatch({type: FETCHING_NOTES});
			const token = localStorage.getItem('JWT')
			const authHeader = {
				headers: { Authorization: token }
			}
			axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${id ? id : 'all'}`, authHeader).then(res => {
				// console.log(res.data)
				if(res.data.allUserNotes){
					dispatch({type: NOTES_RECIEVED, payload: res.data})
				} else {
					dispatch({type: NOTE_RECIEVED, payload: res.data})
				}
			}).catch(err => {
				dispatch({type: NOTE_ERROR, payload: err})
			})
        } else {
          	dispatch({type: ERROR, payload: 'there was no token found'})      
        }
    }
}

// export const getLinks = () =>  {
//     return function(dispatch){
//         if(localStorage.getItem('JWT')){
//           dispatch({type: FETCHING_LINKS});
//           const token = localStorage.getItem('JWT')
//           const authHeader = {
//             headers: {
//               Authorization: token, 
//             }
//           }
//           axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes/all/links`, authHeader)
//           .then(res => {
//             dispatch({type: LINKS_RECIEVED, payload: res.data})
//           })
//           .catch(err => {
//             dispatch({type: NOTE_ERROR, payload: err})
//           })
//         } else {
//           dispatch({type: ERROR, payload: 'there was no token found'})      
//         }
//     }
// }

export const sortNote = (newlySortedArray) => {
    return function(dispatch){
        dispatch({type: SORT_NOTE, payload: newlySortedArray});
    }
}
  