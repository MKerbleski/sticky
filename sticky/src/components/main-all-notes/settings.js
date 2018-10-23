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

  render() {
    return (
       <SettingsDiv>
          <h1>settings</h1>
        </SettingsDiv>
    );
  }
}

const SettingsDiv = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  background-color: #F3F3F3;
  padding: 25px;
  height: 100vh;
`;