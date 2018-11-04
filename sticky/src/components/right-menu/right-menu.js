import React, { Component } from 'react';
import styled from 'styled-components';
import { flex } from '../../styles/styl-utils.js'
import RightMenuDetails from './right-menu-details.js'
import {slackBlack, rightArrow, leftArrow} from '../../img'
import { getConnectedApis } from '../../actions'
import { connect } from 'react-redux';

class RightMenu extends Component {
    state = {
        selectedApp: null,
        openDetails: false,
    }

    componentDidMount(){
        this.props.getConnectedApis()
    }

    eventHandler = (e) => {
        e.preventDefault();
        console.log(e.target.name)
        if(e.target.name === "leftArrow"){
          this.setState({
            openDetails: true
          })
        } else if (e.target.name === "rightArrow"){
          this.setState({
            openDetails: false,
            selectedApp: null
          })
        } else {
          this.setState({
            openDetails: true,
            selectedApp: e.target.name
          }) 
        } 
    }

    render(){
      console.log(this.state)
      return (
        <RightMenuDiv>
          {this.state.openDetails ?
            <RightMenuDetails 
              selectedApp={this.state.selectedApp} 
              onDrop={this.props.onDrop}
              />
            : null
          }

          <div className="right-menu-preview">
              {this.props.state.connectedApis ? 
                    <img 
                      alt="slack-logo" 
                      name="slack" 
                      onClick={this.eventHandler} className="menu-item" 
                      src={slackBlack} /> : null
              }
              {this.state.openDetails ? 
                  <img 
                      alt="rightArrow-logo" 
                      name="rightArrow" 
                      onClick={this.eventHandler} className="menu-item" 
                      src={rightArrow} /> :
                    <img 
                      alt="leftArrow" 
                      name="leftArrow" 
                      onClick={this.eventHandler} className="menu-item" 
                      src={leftArrow} />
              }
          </div>
        </RightMenuDiv>
      )
    }
}

const mapStateToProps = store => {
  return {state: store};
}

const mapDispatchToProps = {
  getConnectedApis,
}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu)

const RightMenuDiv = styled.div`
  ${'' /* ${start('black')} */}
  border: 2px solid black;
  ${'' /* margin: 3; */}
  ${'' /* ${ menu() } */}
  background: lightblue;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 99%;
  .right-menu-preview{
      ${'' /* ${start('blue')} */}
      display: flex;
      flex-direction: column;
      justify-content: center;
      .menu-item{
          ${ flex('row') }
          text-align: center;
          text-decoration: none;
          color: black;
          font-weight: bold;
          font-size: 35px;
          max-width: 30px;
          overflow: hidden;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
      }
  }
  
`;