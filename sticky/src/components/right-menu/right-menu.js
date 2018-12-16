import React, { Component } from 'react';
import styled from 'styled-components';
import { flex } from '../../styles/styl-utils.js'
import RightMenuDetails from './right-menu-details.js'
import { rightArrow, leftArrow} from '../../img'
import { getConnectedApis } from '../../actions'
import { AAA } from '../../helpers/availbleApis'
import { connect } from 'react-redux';

class RightMenu extends Component {
    state = {
        selectedApp: null,
        openDetails: false,
        connectedApis: [],
    }

    componentDidMount(){
        this.props.getConnectedApis()
    }


    eventHandler = (e) => {
        e.preventDefault();
        if(e.target.name === "leftArrow"){
          this.setState({
            openDetails: true,
            selectedApp: "slack"
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
            {this.props.state.connectedApis ? AAA.map(apiName => {
              if(this.props.state.connectedApis[apiName.name] === 1){
                return <img 
                  alt={apiName.alt} 
                  key={apiName.name} 
                  name={apiName.name} 
                  src={apiName.icon} 
                  onClick={this.eventHandler} className="menu-item" />
              } else {
                return null
              }
            }) : <p>!</p>}

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