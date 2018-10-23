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

      let header = {
          consumer_key: '81178-6329dec7e9395b38d4e0b3d3',
          redirect_uri: 'http://localhost:4444/settings'
      }
      console.log('this.pocketTokenRequest')
      axios.get('https://getpocket.com/v3/oauth/request', header).then(res => 
        console.log(res)
      ).catch(err => 
        console.log(err)
        )   
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