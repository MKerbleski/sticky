import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { picture, solid } from '../sticky/src/styles/styl-utils.js'

export default class TopMenu extends Component {
  state = {
    allNotesSelected: false,
    createNoteSelected: false,
  }

  render(){
    return (
      <TopMenuDiv>
        <h1>Sticky</h1>
        <h3>{` Hello ${localStorage.getItem('username')},`}</h3>
        <div className="menu-item" onClick={this.props.logout} >Logout</div>
      </TopMenuDiv>
    );
  };
};

const TopMenuDiv = styled.div`
  border: 1px solid lightgray;
  ${'' /* ${ solid() } */}
  color: white;
  height: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  h1{
    ${'' /* border: 1px solid green; */}
    padding: 10px;
    width: 80%;
  }
  .menu-item{
    ${'' /* border: 1px solid red; */}
    width: 10%;
    padding: 15px;
    text-align: center;
    text-decoration: none;
    color: white;
    ${'' /* background-color: #2AC0C4; */}
    font-weight: bold;
    margin: 10px;
    border: 1px solid gray;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .current {
    ${'' /* background-color: orange; */}
  }
  .red {
    ${'' /* background-color: red; */}
    ${'' /* color: black; */}
    height: 200px;
  }
`;