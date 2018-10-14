import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { picture, solid, center } from '../../styles/styl-utils.js'
import DeleteTarget from './delete-target.js';


export default class LeftMenu extends Component {
  state = {
    allNotesSelected: false,
    createNoteSelected: false,
  }

  render(){
    return (
      <LeftMenuDiv>
        <Link className={this.state.allNotesSelected ? "current menu-item" : "menu-item"}  to="/all-notes" style={this.props}>All</Link>
        <Link className="menu-item" to="/new-note">New</Link>
        {/* <div className="menu-item" onClick={this.download} >Download CSV</div> */}
        <DeleteTarget type='deleteBin' className="menu-item red" />
        {/* <div  onClick={this.delete} to="/deleted-notes">Delete Item</div> */}
      </LeftMenuDiv>
    );
  };
};

const LeftMenuDiv = styled.div`
  border: 1px solid lightgray;
  ${ solid() }
  color: white;
  height: auto;
  width: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .menu-item{
    ${'' /* border: 1px solid red; */}
    width: 40%;
    height: 50px;
    padding: 15px;
    text-align: center;
    text-decoration: none;
    color: black;
    background-color: #8d9ea5;
    font-weight: bold;
    margin: 10px;
    font-size: 22px;
    border: 1px solid gray;
    ${ center() }
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .current {
    background-color: orange;
  }
  .red {
    background-color: red;
    color: black;
    height: 200px;
  }
`;