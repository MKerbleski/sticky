import {
  FETCHING_NOTES,
  NOTES_RECIEVED,
  ERROR,
  NOTE_ADDED,
  ADDING_NOTE,
  DELETING_NOTE,
  NOTE_DELETED,
  EDITING_NOTE,
  NOTE_EDITED,
  SORT_NOTE,
  SENDING_NEW_USERDATA,
  USER_CREATED,
  SENDING_CREDENTIALS,
  CREDENTIALS_ACCEPTED,
  FAILED_LOGIN_ATTEMPT,
  FAILED_REGISTRATION_ATTEMPT,
  LOGOUT,
  FETCHING_USERDATA,
  USERDATA_RECIEVED,
  SLACK_STARS_RECIEVED,
  FETCHING_SLACK_STARS,
  FETCHING_LINKS,
  LINKS_RECIEVED,
  FETCHING_DEL_NOTES,
  DEL_NOTES_RECIEVED,
  API_LIST_RECIEVED,
  FETCHING_API_LIST,
  NEW_NOTE_FALSE,
  NEW_NOTE_TRUE,
} from '../actions';

const initialState = {
  notes: [],
  links: [],
  addingNote: false,
  noteAdded: false,
  fetchingNotes: false,
  notesRecieved: false,
  status: '',
  error: null,
  failedLoginAttempt: false,
  showNewNote: false
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_NOTE_FALSE:
      return Object.assign({}, state, {
        showNewNote: false,
      })
    case NEW_NOTE_TRUE:
      return Object.assign({}, state, {
        showNewNote: true,
      })
    case FETCHING_API_LIST:
      return Object.assign({}, state, {
        fetchingApiList: true,
      })
    case API_LIST_RECIEVED:
      return Object.assign({}, state, {
        fetchingApiList: false,
        connectedApis: action.payload
      })
    case FETCHING_DEL_NOTES:
      return Object.assign({}, state, {
        fetchingDelNotes: true,
      })
    case DEL_NOTES_RECIEVED:
      return Object.assign({}, state, {
        fetchingDelNotes: false,
        deletedNotes: action.payload.allUserDelNotes
      })
    case LOGOUT: 
      return Object.assign({}, state, {
        notes: [],
        links: [],
        slackStars: [],
        userData: {},
        slackToken: null,
      })
    case FAILED_REGISTRATION_ATTEMPT:
      return Object.assign({}, state, {
        failedRegistrationAttempt: true,
      })
    case FAILED_LOGIN_ATTEMPT:
      return Object.assign({}, state, {
        failedLoginAttempt: true,
      })
    case SENDING_CREDENTIALS:
      return Object.assign({}, state, {
        sendingCredentials: true,
        sucessfulLogin: false,
      })
    case CREDENTIALS_ACCEPTED:
      return Object.assign({}, state, {
        sucessfulLogin: true,
        failedLoginAttempt: false,
        failedRegistrationAttempt: false,
        sendingCredentials: false,
        token: action.payload.token,
        username: action.payload.username
      })
    case SENDING_NEW_USERDATA:
      return Object.assign({}, state, {
        sendingNewUser: true,
      })
    case USER_CREATED:
      return Object.assign({}, state, {
        sendingNewUser: false,
        failedRegistrationAttempt: false,
        userCreated: true,
        username: action.payload.username,
        token: action.payload.token
      })
    case FETCHING_USERDATA:
      return Object.assign({}, state, {
        fetchingUserInfo: true,
      })
    case USERDATA_RECIEVED:
      return Object.assign({}, state, {
        fetchingUserInfo: false,
        userData: action.payload,
        slackToken: action.payload.slack
      })
    case FETCHING_LINKS:
      return Object.assign({}, state, {
        fetchingLinks: true,
      })
    case LINKS_RECIEVED:
      return Object.assign({}, state, {
        fetchingLinks: false,
        linksRecieved: true,
        links: action.payload.allUserLinks,
      })
    case FETCHING_NOTES:
      return Object.assign({}, state, {
        fetchingNotes: true,
      })
    case NOTES_RECIEVED:
      return Object.assign({}, state, {
        fetchingNotes: false,
        notesRecieved: true,
        notes: action.payload.allUserNotes,
        username: action.payload.username
      })
    case ADDING_NOTE:
      return Object.assign({}, state, {
        addingNote: true,
      })
    case NOTE_ADDED:
      return Object.assign({}, state, {
        addingNote: false,
        noteAdded: true,
        status: action.payload,
      })
    case SLACK_STARS_RECIEVED:
      return Object.assign({}, state, {
        slackStars: action.payload.items,
        gettingSlackStars: false
      })
    case FETCHING_SLACK_STARS:
      return Object.assign({}, state, {
        gettingSlackStars: true
      })
    case DELETING_NOTE:
      return Object.assign({}, state, {
        deletingNote: true,
      })
    case NOTE_DELETED:
      return Object.assign({}, state, {
        deletingNote: false,
        noteDeleted: true,
        status: action.payload,
      })
    case EDITING_NOTE:
      return Object.assign({}, state, {
        editingNote: true,
      })
    case NOTE_EDITED:
      return Object.assign({}, state, {
        editingNote: false,
        noteEdited: true,
        status: action.payload,
      })
    case ERROR:
      return Object.assign({}, state, {
        fetchingNotes: false,
        notesRecieved: false,
        addingNote: false,
        noteAdded: false,
        error: true,
        status: action.payload,
      })
    case SORT_NOTE:
      return Object.assign({}, state, {
        customSort: true,
        notes: action.payload,
      })
    default:
      return state;
  }
}