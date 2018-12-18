import {
  ERROR,
} from '../actions';

const initialState = {

  links: [],
  status: '',
  error: null,
  
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return Object.assign({}, state, {
        fetchingNotes: false,
        notesRecieved: false,
        addingNote: false,
        noteAdded: false,
        error: true,
        status: action.payload,
      })
    default:
      return state;
  }
}