export const ERROR = 'ERROR';

export { 
    getPocketList,
    getPocketSettings
} from './pocket_actions'

export { 
    getSlackStars,
    getSlackSettings 
} from './slack_actions'

export { 
    sortNote,
    getLinks, 
    getNotes, 
    addNote, 
    getDeletedNotes, 
    getAttachedItems, 
    editAttachedItems, 
    deleteNote, 
    editNote, 
    getChildren, 
    getSingleNote, 
    noteToNote 
} from './note_actions'

export { 
    logout, 
    getUserData, 
    getConnectedApis, 
    createUser, 
    loginUser,
    clearUserStatus
} from './user_actions'

export const handleErrorCodes = (err) => {
	return function(dispatch){
		if(err.response){
			switch(err.response.status){
				case 404:
					dispatch({
                        type: ERROR,
                        payload: {
                            data: {
                                message: "404 Error with endpoint.",
                                },
                            status: 404
                        }
                    })
					break;
				case 400: 
					dispatch({type: ERROR, payload: err.response})
					break;
				case 401: 
					dispatch({type: ERROR, payload: err.response})
					break;
				case 500: 
					dispatch({type: ERROR, payload: err.response})
					break;
				default: 
					console.log("UNEXPECTED ERROR", err.response)
					dispatch({type: ERROR, payload: err.response})
					break;
			}
		} else {
			dispatch({
                type: ERROR, 
                payload: {
                    data: {
                        message: "Error communicating with the server.",
                        },
                    status: 503
                }
            })
		}
	}
}