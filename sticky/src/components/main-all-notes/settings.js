import React, { Component } from 'react';
import styled from 'styled-components';
// import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
  }

  pocketTokenRequest = (e) => {
      e.preventDefault();
      console.log('this.pocketTokenRequest')
      let consumer_key = '81178-6329dec7e9395b38d4e0b3d3';
      let redirect_uri = 'http://localhost:4444'
      let Header = {
        'Host': 'getpocket.com',
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Access-Control-Allow-Origin': 'http://localhost:4444',
        'X-Accept': 'application/x-www-form-urlencoded'
      }//I dont think this is doing anything now
      axios.get(`https://getpocket.com/v3/oauth/request?consumer_key=${consumer_key}&redirect_uri=${redirect_uri}`, Header).then(res => {
          let pocketToken = res.data
          pocketToken = pocketToken.slice(5);
          console.log(pocketToken)
          localStorage.setItem('pocketToken', pocketToken)
          window.open(`https://getpocket.com/auth/authorize?request_token=${pocketToken}&redirect_uri=${redirect_uri}`)
        )
      }
      ).catch(err => 
        console.log(err.message)
        )   
  }

  getRealToken = () => {
      axios.get(`https://getpocket.com/v3/oauth/authorize?consumer_key=${consumer_key}&code=${pocketToken}`).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      }) //need to finish this

  }

  render() {
    return (
       <SettingsDiv>
          <h1>settings</h1>
          <h4>Connected Apps</h4>
          <button onClick={this.pocketTokenRequest}>Connect to Pocket</button>
        </SettingsDiv>
    );
  }
}

const SettingsDiv = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  padding: 25px;
  height: 100vh;
`;