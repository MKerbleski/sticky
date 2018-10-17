import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { flex, menu } from '../../styles/styl-utils.js'
import DeleteTarget from './delete-target.js';


export default class LeftMenu extends Component {
  state = {
    allNotesSelected: false,
    createNoteSelected: false,
  }

  render(){
    return (
      <LeftMenuDiv>
        <div className='leftMenuTop'>
          <Link className={this.state.allNotesSelected ? "current menu-item" : "menu-item"}  to="/all-notes" style={this.props}><i class="fab fa-stack-overflow"></i></Link>
          <Link className="menu-item" to="/new-note"><i class="fas fa-plus-square"></i></Link>
          <div className="menu-item"><i class="fas fa-tv"></i></div>
          <div className="menu-item"><i class="fas fa-book-open"></i></div>
        </div>
        <div className="leftMenuBottom">
          {/* <div className="menu-item" onClick={this.download} >Download CSV</div> */}
          <DeleteTarget type='deleteBin' className="menu-item red" />
          {/* <div  onClick={this.delete} to="/deleted-notes">Delete Item</div> */}
          <div className="menu-item"><i class="fas fa-cogs"></i></div>
        </div>
      </LeftMenuDiv>
    );
  };
};

const LeftMenuDiv = styled.div`
  ${'' /* border: 1px solid lightgray; */}
  ${'' /* ${ solid() } */}
  ${ menu() }
  color: white;
  height: 100%;
  width: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .menu-item{
    ${'' /* border: 1px solid red; */}
    height: 50px;
    text-align: center;
    text-decoration: none;
    color: black;
    font-weight: bold;
    margin: 10px;
    font-size: 22px;
    ${ flex('row') }
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