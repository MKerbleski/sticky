import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { flex, menu, start } from '../../styles/styl-utils.js'
import {twitter, pocket, chrome, slack, rightArrow} from '../../img'

export default class RightMenuDetails extends Component {
  constructor(props){
      super(props);
      this.state = {
          logo: this.props.app,
          fakeList: []
      }
  }

  componentDidMount(props){
    var foo = [];
    for (var i = 1; i <= 50; i++) {
       foo.push(i + ` - note example`);
    }
    this.setState({
        fakeList: foo
    })
  }

  render(props){
      console.log(this.state)
    return (
      <RightMenuDetailsDiv>
        <div className="app-title">
            {/* <img name={this.props.app} onClick={this.eventHandler} className="menu-item" src={chrome}></img> */}
            <h4>{this.props.app}</h4>
        </div>
        <div className="app-list">
            {this.state.fakeList.map(title => {
                return (
                    <div key={title} className="list-title">{title}</div>
                )
            })}
        </div>
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
    .list-title{
        border: 1px solid red;
        padding: 3px;
        color: black;
        margin-left: 28px ;
    }
  }
`;