import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { flex, menu, start } from '../../styles/styl-utils.js'
import RightMenuDetails from './right-menu-details.js'
import {twitter, pocket, chrome, slack, rightArrow} from '../../img'

export default class RightMenu extends Component {
  state = {
    selectedApp: '',
    openDetails: false,
  }

  componentDidMount(){
    this.props.getSlackList()
  }

  eventHandler = (e) => {
    e.preventDefault();
    console.log('eventHandler', e.target.name)
    if(!this.state.openDetails){
      this.setState({
        selectedApp: e.target.name, 
        openDetails: true
      })
    } else if (e.target.name === "rightArrow"){
      this.setState({
        openDetails: false
      })
    } else {
      this.setState({
        selectedApp: e.target.name
      })
    }
    console.log(this.state)
  }

  render(){
    return (
      <RightMenuDiv>
        {this.state.openDetails ?
          <RightMenuDetails 
            // getSlackList={this.props.getSlackList} 
            slackStars={this.props.slackStars} 
            app={this.state.selectedApp} 
            onDrop={this.props.onDrop}
            />
          : null}
        <div className="right-menu-preview">
          <div className='rightMenuTop'>  
            <img alt="chrome-logo" name="chrome" onClick={this.eventHandler} className="menu-item" src={chrome}></img>
            <img alt="twitter-logo" name="twitter" onClick={this.eventHandler} className="menu-item" src={twitter}></img>
            <img alt="slack-logo" name="slack" onClick={this.eventHandler} className="menu-item" src={slack}></img>
            <img alt="pocket-logo" name="pocket" onClick={this.eventHandler} className="menu-item" src={pocket}></img>
            {this.state.openDetails ? 
            <img alt="rightArrow-logo" name="rightArrow" onClick={this.eventHandler} className="menu-item" src={rightArrow}></img> : null}
          </div>
        </div>
      </RightMenuDiv>
    );
  };
};

const RightMenuDiv = styled.div`
  ${start('black')}
  border: 3px solid black;
  margin: 3;
  ${ menu() }
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100%;
  .right-menu-preview{
    ${start('blue')}
    .menu-item{
      ${ flex('row') }
      text-align: center;
      text-decoration: none;
      color: black;
      font-weight: bold;
      font-size: 30px;
      max-width: 30px;
      overflow: hidden;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  }
  
`;