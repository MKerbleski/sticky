import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { menu, start } from '../../styles/styl-utils.js'
// import {twitter, pocket, chrome, slack, rightArrow} from '../../img'
import SlackNote from './slack-note.js'

export default class RightMenuDetails extends Component {
  constructor(props){
      super(props);
      this.state = {
          logo: this.props.app,
          fakeList: []
      }
  }

  componentDidMount(props){
    console.log(this)
    if(this.state.logo === 'slack'){
        console.log(this.props)
        this.setState({
            slackStars: this.props.slackStars
        })
    }
  }

  render(props){
    return (
      <RightMenuDetailsDiv>
        <div className="app-title">
            {/* <img name={this.props.app} onClick={this.eventHandler} className="menu-item" src={chrome}></img> */}
            <h4>{this.props.app} - this is a feed from slack, when dragged to a note, it becomes saved to sticky</h4>
        </div>
        {this.state.slackStars ? 
        <div className="app-list">
            {this.state.slackStars.map(star => {
                if(star.type === "message"){
                    {/* console.log(star, 'message') */}
                    return (
                        <SlackNote type="link" onDrop={this.props.onDrop} key={star.date_create} star={star}></SlackNote>
                    )
                } else if (star.type === "channel") {
                    {/* console.log(star, 'not message') */}
                    return (
                        <div key={star.date_create} className="list-title">stared channel: {star.channel}</div>
                    )
                } else {
                    return (
                        <p>no data or failed to load</p>
                    )
                }
            })}
        </div> : <p>loading</p>}
      </RightMenuDetailsDiv>
    );
  };
};

const RightMenuDetailsDiv = styled.div`
    ${'' /* height: 100%; */}
  ${start('purple')}
  margin: 5px;
  ${ menu() }
  color: white;
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .app-title{

  }
  .app-list{
    overflow: auto;
    .slack-card{
       
    }
  }
`;