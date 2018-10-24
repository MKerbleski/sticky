import React, { Component } from 'react';
import styled from 'styled-components';
// import {Link} from 'react-router-dom';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { SettingsAuth } from './index'
import Redirect from 'react-router-dom/Redirect';

export default class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {
      hello: false,
    }
  }

  componentDidMount(){
  }

  pocketTokenRequest = (consumer_key, redirect_uri) => {
      console.log('this.pocketTokenRequest')
      // let Header = {
      //   'Host': 'getpocket.com',
      //   'Content-Type': 'application/x-www-form-urlencoded', 
      //   'Access-Control-Allow-Origin': 'http://localhost:4444',
      //   'X-Accept': 'application/x-www-form-urlencoded'
      // }//I dont think this is doing anything now
      let pocketToken = axios.post(`https://getpocket.com/v3/oauth/request?consumer_key=${consumer_key}&redirect_uri=${redirect_uri}`).then(res => {
          console.log(res, 'res')
          let pocketToken = res.data
          pocketToken = pocketToken.slice(5);
          localStorage.setItem('pocketToken', pocketToken)
          console.log(pocketToken, 'next')
        
          return pocketToken
        }
      ).then(res => {
        console.log('second then', res)
      }).then(res => {
        console.log('third then ', res)
      }).catch(err => 
        console.log(err.message)
        ) 
      return pocketToken
  }

  getPocket = async (e) => {
    e.preventDefault();
    let consumer_key = '81178-6329dec7e9395b38d4e0b3d3';
    let redirect_uri = 'http://localhost:4444/'
    
    let pocketToken = await this.pocketTokenRequest(consumer_key, redirect_uri)
    this.setState({
      hello: true, 
      pocketToken: pocketToken, 
    })
    //  localStorage.getItem('PocketToken')
    console.log(pocketToken)
    // await window.open()

  }

  render() {
    return (
       <SettingsDiv>
          <h1>settings</h1>
          <h4>Connected Apps</h4>
          <button onClick={this.getPocket}>Connect to Pocket</button>

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