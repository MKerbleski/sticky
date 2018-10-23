import React, { Component } from 'react';
import styled from 'styled-components';
// import {Link} from 'react-router-dom';

export default class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
  }

  pocketTokenRequest = () => {

  }

  render() {
    return (
       <SettingsDiv>
          <h1>settings</h1>
          <h4>Connected Apps</h4>
          <a href="www.google.com">Connect to Chrome</a>
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