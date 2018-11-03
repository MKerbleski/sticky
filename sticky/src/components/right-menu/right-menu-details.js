import React, { Component } from 'react';
import styled from 'styled-components';
import { menu, start } from '../../styles/styl-utils.js'
import { slackWord } from '../../img'
import SlackNote from '../slack-note.js'

export default class RightMenuDetails extends Component {
  constructor(props){
      super(props);
      this.state = {
          logo: this.props.app,
          fakeList: []
      }
  }

  componentDidMount(props){
    if(this.state.logo === 'slack'){
        this.setState({
            slackStars: this.props.slackStars
        })
    }
  }

  render(props){
    return (
      <RightMenuDetailsDiv>
        <div className="app-title">
            <img alt='slackLogo' name={this.props.app} onClick={this.eventHandler} className="rm-details-name" src={slackWord}></img>
            
        </div>
        {this.state.slackStars ? 
        <div className="app-list">
            {this.state.slackStars.map(star => {
                if(star.type === "message"){
                    return <SlackNote type="link" onDrop={this.props.onDrop} key={star.date_create} star={star}></SlackNote>
                } else if (star.type === "channel") {
                    return <div key={star.date_create} className="list-title">stared channel: {star.channel}</div>
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
  background-color: white;
  flex-direction: column;
  ${'' /* .app-title{
      max-width: 100px;
  }
  .app-list{
    overflow: auto;
    .slack-card{
       
    }
  } */}
`;