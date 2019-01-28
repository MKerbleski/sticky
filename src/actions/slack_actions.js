import axios from 'axios';

export const FETCHING_SLACK_STARS = 'FETCHING_SLACK_STARS';
export const SLACK_STARS_RECIEVED = 'SLACK_STARS_RECIEVED';
export const SLACK_ERROR = 'SLACK_ERROR';
export const ERROR = 'ERROR';

export const getSlackStars = () =>  {
    return function(dispatch){
      if(localStorage.getItem('JWT')){
        dispatch({type: FETCHING_SLACK_STARS});
        const token = localStorage.getItem('JWT')
        const authHeader = {
          headers: {
            Authorization: token, 
          }
        }
        axios.get(`http://localhost:3333/api/slack/list`, authHeader)
        .then(res => {
          dispatch({type: SLACK_STARS_RECIEVED, payload: res.data})
        })
        .catch(err => {
          dispatch({type: SLACK_ERROR, payload: err})
        })
      } else {
        dispatch({type: ERROR, payload: 'there was no token found'})      
      }
    }
  }
  